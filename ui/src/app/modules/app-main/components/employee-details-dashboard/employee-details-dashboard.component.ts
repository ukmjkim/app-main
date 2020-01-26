import { Component, OnInit, OnChanges, Input, SimpleChanges, AfterViewInit, ViewChildren } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AidDialogService, AidLoggerService, AidBroadCasterParams } from '@ukmjkim/aid-lib-services';
import { AppMainPermissionType } from '../../models/app-main-permission-type.enum';
import { AppMainState } from '../../models/app-main-state';
import { EmployeeSearchService } from '../../services/employee-search.service';
import { EmployeeDashboardTypeStatsDto } from '../../models/employee-dashboard-type-stats-dto';
import { EmployeeSearchMethodService } from '../employee-search/employee-search-method.service';
import {
  EmployeeDashboardTypes,
  straight,
  netGuarantee,
  sag,
  purchase,
  guarantee,
  inventory,
  signed,
  unsigned,
  deleted
} from '../../constants/employee-type';

@Component({
  selector: 'aid-employee-details-dashboard',
  templateUrl: './employee-details-dashboard.component.html',
  styleUrls: ['./employee-details-dashboard.component.scss']
})
export class EmployeeDetailsDashboardComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() appMainState: AppMainState;
  @ViewChildren('searchInputBox') searchInputBox;

  public contractStats: EmployeeDashboardTypeStatsDto;
  public contractChart: any;
  public isMobileDevice = false;

  public contractDashboardTypes: EmployeeDashboardTypes[] = [
    sag,
    guarantee,
    straight,
    netGuarantee,
    inventory,
    purchase
  ];


  public contractDashboardTypesSigned: EmployeeDashboardTypes[] = [
    signed,
    unsigned,
    deleted
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private logger: AidLoggerService,
    private dialogService: AidDialogService,
    private employeeSearchMethodService: EmployeeSearchMethodService,
    private employeeSearchService: EmployeeSearchService) {
  }

  ngOnInit() {
    this.loadData();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['appMainState']) {
      this.logger.info('EmployeeDashboardComponent ngOnChanges this.appMainState', this.appMainState);
      this.employeeSearchService.setUXOnly(this.appMainState.isUXOnly);
      this.employeeSearchMethodService.setAppMainState(this.appMainState);
      this.loadData();
    }
  }

  ngAfterViewInit() {
    this.searchInputBox.first.nativeElement.focus();
  }

  public keyEnter(event, query) {
    if (event.keyCode === 13 && query.length > 0) {
      this.openEmployeeSearchByKeyword(query);
    }
  }

  public refresh() {
    this.loadData();
  }

  public isChartReady(): boolean {
    return !!this.contractStats;
  }

  loadData() {
    setTimeout(() => {
      this.employeeSearchService.getEmployeeStats().subscribe(results => {
        this.contractStats = EmployeeDashboardTypeStatsDto.createEmployeeStatsDtoFromJson(results);
      });
    });
  }

  getEmployeeCountByType(type: string): number {
    if (!this.contractStats) {
      return 0;
    }

    return EmployeeDashboardTypeStatsDto.getEmployeeCountByType(this.contractStats, type);
  }

  openEmployee(contractType: string) {
    this.employeeSearchMethodService.configureDefaultView(contractType);
  }

  openEmployeeSearchByKeyword(searchText: string) {
    const query = searchText ? searchText : '';
    if (query) {
      this.employeeSearchMethodService.configureDefaultViewBySearchKeyword(query);
    }
  }

  openEmployeeSearchByContractType(contractType: string) {
    this.employeeSearchMethodService.configureContractByContractType(contractType);
  }

  openEmployeeSearchByContractStatus(contractStatus: string) {
    this.employeeSearchMethodService.configureContractByContractStatus(contractStatus);
  }
}
