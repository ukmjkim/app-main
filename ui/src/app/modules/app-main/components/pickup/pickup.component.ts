import { Component, Input, OnInit, SimpleChanges, Injector } from '@angular/core';
import { AidLoggerService } from '@ukmjkim/aid-lib-services';
import { AppMainPermissionType } from '../../models/app-main-permission-type.enum';
import { AppMainState } from '../../models/app-main-state';
import { ContentDataType } from '../../models/content-data-type.enum';
import { PickupSearchMethodService } from '../pickup-search/pickup-search-method.service';
import { PickupLinkType } from '../../constants/link-type';

@Component({
  selector: 'aid-pickup',
  templateUrl: './pickup.component.html',
  styleUrls: ['./pickup.component.scss']
})
export class PickupComponent implements OnInit {
  @Input() id: string;
  @Input() contentDataType: ContentDataType;
  @Input() appInjector: Injector;
  @Input() appMainState: AppMainState;
  @Input() pageTitle: string;
  @Input() pageInfo: string;

  public purchaseOrderNumberList: number[];

  constructor(private logger: AidLoggerService,
    private pickupSearchMethodService: PickupSearchMethodService) {

  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['appMainState']) {
      this.logger.info("PickupComponent ngOnChanges this.appMainState", this.appMainState);
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

}
