import {Component, Input, ViewChildren, SimpleChanges, Injector, ViewEncapsulation} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { Chart, ChartOptions, Label, ChartType, ChartDataSets } from 'chart.js';
import { AidDialogService, AidLoggerService, AidBroadCasterParams } from '@ukmjkim/aid-lib-services';
import { AppMainPermissionType } from '../../models/app-main-permission-type.enum';
import { AppMainState } from '../../models/app-main-state';
import { ContentDataType } from '../../models/content-data-type.enum';
import { PickupDashboardStatsService } from '../../services/pickup-dashboard-stats.service';
import { PickupDashboardStatsHeader } from '../../models/pickup-dashboard-stats-header';
import { PickupDashboardStatsLine } from '../../models/pickup-dashboard-stats-line';
import { PickupDashboardIssueStat } from '../../models/pickup-dashboard-issue-stat';
import {
  PICKUP_DASHBOARD_STATE_COLOR,
  PickupStates,
  New,
  InProgress,
  Completed,
  Canceled
} from '../../constants/pickup-dashboard-state';
import { PickupSearchMethodService } from '../pickup-search/pickup-search-method.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'aid-pickup-dashboard',
  templateUrl: './pickup-dashboard.component.html',
  styleUrls: ['./pickup-dashboard.component.scss']
})
export class PickupDashboardComponent {
  @Input() id: string;
  @Input() contentDataType: ContentDataType;
  @Input() appInjector: Injector;
  @Input() appMainState: AppMainState;
  @Input() pageTitle: string;
  @Input() pageInfo: string;

  @ViewChildren('searchInputBox') searchInputBox;

  readonly todayLabel = "Today's Pickups";
  readonly tomorrowLabel = "Tomorrow's Pickups";

  broadcaster = new BroadcastChannel('app-main');

  public pickup: PickupDashboardStatsHeader;
  public pickupLine: PickupDashboardStatsLine;
  public pickupIssue: PickupDashboardIssueStat;
  public stateChart: Chart;

  public pickupStates: PickupStates[] = [
    New,
    InProgress,
    Completed,
    Canceled
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialogService: AidDialogService,
    private logger: AidLoggerService,
    private pickupSearchMethodService: PickupSearchMethodService,
    private pickupDashboardStatsService: PickupDashboardStatsService) {
  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['appMainState']) {
      this.logger.info('PurchaseOrderDashboardComponent ngOnChanges this.appMainState', this.appMainState);
      this.pickupDashboardStatsService.setUXOnly(this.appMainState.isUXOnly);
      this.pickupSearchMethodService.setAppMainState(this.appMainState);
      this.loadData();
    }
  }


  ngOnDestroy() {

  }

  ngAfterViewInit() {
    this.searchInputBox.first.nativeElement.focus();
  }

  public keyEnter(event, query) {
    if (event.keyCode === 13 && query.length > 0) {
      this.openSearch(query);
    }
  }


  public isChartReady(): boolean {
    return !!this.pickup;
  }

  public refresh() {
    this.loadData();
    const param: AidBroadCasterParams = { type: 'contentReload', data: {} };
    this.broadcaster.postMessage(param);
    this.logger.info('PurchaseOrderDashboardComponent > refresh', param);
  }

  private loadData() {
    setTimeout(() => {
      this.pickupDashboardStatsService.getPickupStats(this.appMainState.eventId).subscribe(results => {
        this.pickup = PickupDashboardStatsHeader.createPickupDashboardStatsHeaderFromJson(results);
        this.redrawCharts();
      });

      this.pickupDashboardStatsService.getPickupIssueStats(this.appMainState.siteId, this.appMainState.eventId).subscribe(results => {
        this.pickupIssue = results;
      });
    });
  }

  private redrawCharts() {
    this.loadPickupDashboardStatsHeaderChart();
  }

  private loadPickupDashboardStatsHeaderChart() {
    if (!this.isChartReady()) return;

    if (this.stateChart) {
      this.logger.info('PurchaseOrderDashboardComponent > loadStatsDoughbutChart reload - loading the Pickups for Auction Event');
      this.stateChart.data.datasets = this.loadStatsDoughnutChartDatasets();
      this.stateChart.update();
    } else {
      this.logger.info('PurchaseOrderDashboardComponent > drawStatsDoughnutChart initial - loading the Pickups for Auction Event');
      this.drawStatsDoughnutChart();
    }
  }

  private drawStatsDoughnutChart() {
    this.logger.info('PurchaseOrderDashboardComponent > drawStatsDoughnutChart initial - loading the Chart for Auction Event');

    const chartDatasets = this.loadStatsDoughnutChartDatasets();

    this.logger.info('PurchaseOrderDashboardComponent > drawStatsDoughnutChart()', chartDatasets);


    this.stateChart = new Chart('canvasStats', {
      type: 'doughnut',
      data: {
        datasets: chartDatasets
      },
      options: {
        maintainAspectRatio: true,
        title: {
          display: false
        },
        cutoutPercentage: 80,
        tooltips: {
          callbacks: {
            label: function (item, data) {
              return data.datasets[item.datasetIndex].label[item.index]
                + ": " + data.datasets[item.datasetIndex].data[item.index];
            }
          }
        }
      }
    });
  }

  private loadStatsDoughnutChartDatasets() {
    return [
      {
        label: [
          New.label,
          InProgress.label,
          Completed.label,
          Canceled.label
        ],
        backgroundColor: [
          PICKUP_DASHBOARD_STATE_COLOR.New,
          PICKUP_DASHBOARD_STATE_COLOR.InProgress,
          PICKUP_DASHBOARD_STATE_COLOR.Completed,
          PICKUP_DASHBOARD_STATE_COLOR.Canceled
        ],
        data: [
          // PickupDashboardStatsHeader.getPickupCountByState(this.pickup, 'New'),
          // PickupDashboardStatsHeader.getPickupCountByState(this.pickup, 'InProgress'),
          // PickupDashboardStatsHeader.getPickupCountByState(this.pickup, 'Completed'),
          // PickupDashboardStatsHeader.getPickupCountByState(this.pickup, 'Canceled')
          1,
          2,
          3,
          4
        ]
      }];
  }

  getPickupCountByState(state: string): number {
    if (!this.pickup) return 0;

    return PickupDashboardStatsHeader.getPickupCountByState(this.pickup, state);
  }

  getPickupExpressCountByState(state: string): number {
    if (!this.pickup) return 0;

    return PickupDashboardStatsHeader.getPickupExpressCountByState(this.pickup, state);
  }

  /* ====================================================================== */
  /* Default View START */
  openSearch(searchText: string) {
    const query = searchText ? searchText : '';
    if (query) {
      this.pickupSearchMethodService.configureEventPickupWithSearchKeyword(
        this.appMainState.siteId,
        this.appMainState.eventId,
        this.appMainState.saleNumber,
        query);
    }
  }
  /* Default View END */
  /* ====================================================================== */


  /* ====================================================================== */
  openPickup(): void {
    this.pickupSearchMethodService.configureEventPickup(
      this.appMainState.siteId,
      this.appMainState.eventId,
      this.appMainState.saleNumber);
  }

  openPickupByState(state: string): void {
    this.pickupSearchMethodService.configureEventPickupWithState(
      this.appMainState.siteId,
      this.appMainState.eventId,
      this.appMainState.saleNumber, state);
  }
  /* ====================================================================== */
}
