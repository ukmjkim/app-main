import { Component, Input, OnInit, SimpleChanges, Injector } from '@angular/core';
import { AidLoggerService } from '@ukmjkim/aid-lib-services';
import { AppMainPermissionType } from '../../models/app-main-permission-type.enum';
import { AppMainState } from '../../models/app-main-state';
import { ContentDataType } from '../../models/content-data-type.enum';
import { PickupCalendar } from '../../models/pickup-calendar';
import { PickupService } from '../../services/pickup.service';
import { PickupLinkType } from '../../constants/link-type';

@Component({
  selector: 'aid-pickup-schedule',
  templateUrl: './pickup-schedule.component.html',
  styleUrls: ['./pickup-schedule.component.scss']
})
export class PickupScheduleComponent implements OnInit {
  @Input() id: string;
  @Input() contentDataType: ContentDataType;
  @Input() appInjector: Injector;
  @Input() appMainState: AppMainState;
  @Input() pageTitle: string;
  @Input() pageInfo: string;

  public pickups: PickupCalendar[];
  public purchaseOrderNumberList: number[];

  constructor(private logger: AidLoggerService,
    private pickupService: PickupService) {

  }

  ngOnInit() {
    this.loadData();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['appMainState']) {
      this.logger.info("PickupScheduleComponent ngOnChanges this.appMainState", this.appMainState);
      this.pickupService.setUXOnly(this.appMainState.isUXOnly);
      // if (this.appMainState.eventId === undefined || this.appMainState.eventId === 0) {
      //   this.pickupSearchMethodService.configureSitePurchaseOrderNoNavChange();
      // } else {
      //   this.pickupSearchMethodService.configureEventPurchaseOrderNoNavChange();
      // }
    }
  }

  selectedPurchaseOrder(purchaseOrderNumberList) {
    this.purchaseOrderNumberList = purchaseOrderNumberList;
  }

  private loadData() {
    setTimeout(() => {
      this.pickupService.getPickupsForCalendar().subscribe(results => {
        console.log('getPickupsForCalendar loadData', results);
        this.pickups = Object.assign([], results);
      });
    });
  }
}
