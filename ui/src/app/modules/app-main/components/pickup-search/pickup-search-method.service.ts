import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DataTablePicklistValue } from '@ukmjkim/aid-data-table';
import { AidUrlUtil } from '@ukmjkim/aid-lib-services';
import { AppMainPermissionType } from '../../models/app-main-permission-type.enum';
import { AppMainState } from '../../models/app-main-state';
import { PickupSearchViewEnum } from './conf/pickup-search-view.enum';
import { PickupSearchQueryService } from './pickup-search-query.service';
import { PickupColumnVariableName } from './conf/pickup-column-variable-name.conf';
import { PickupStatus } from '../../models/pickup-status.enum';
import {
  New,
  InProgress,
  Completed,
  Canceled
} from '../../constants/pickup-dashboard-state';
import { PickupLinkType } from '../../constants/link-type';

@Injectable({
    providedIn: 'root'
})
export class PickupSearchMethodService {
    appMainState: AppMainState;

    constructor(
        private router: Router,
        private purchaseOrderSearchQueryService: PickupSearchQueryService) {
    }

    public setAppMainState(appMainState: AppMainState) {
        this.appMainState = appMainState;
    }

    // For Side Bar - routerLink will navigate the page
    public configureSitePickupNoNavChange() {
        this.purchaseOrderSearchQueryService.clear();
        this.purchaseOrderSearchQueryService.setSearchView(PickupSearchViewEnum.Default);
    }

    // For Side Bar - routerLink will navigate the page
    public configureEventPickupNoNavChange() {
        this.purchaseOrderSearchQueryService.clear();
        this.purchaseOrderSearchQueryService.setSearchView(PickupSearchViewEnum.Event);
    }

    public configureEventPickup(siteId: number, eventId: number, saleNumber: string): void {
        this.purchaseOrderSearchQueryService.clear();
        this.purchaseOrderSearchQueryService.setSearchView(PickupSearchViewEnum.Event);
        this.purchaseOrderSearchQueryService.addPicklistFilterColumnNameValue(PickupColumnVariableName.saleNumber, saleNumber);

        const url = this.appMainState.linkSet.get(PickupLinkType.eventPickupSearch.toString());
        this.navigateToPickups(siteId, eventId, url);
    }

    public configureEventPickupWithSearchKeyword(siteId: number, eventId: number, saleNumber: string, keyword: string) {
        this.purchaseOrderSearchQueryService.clear();
        this.purchaseOrderSearchQueryService.setSearchView(PickupSearchViewEnum.Event);
        this.purchaseOrderSearchQueryService.addPicklistFilterColumnNameValue(PickupColumnVariableName.saleNumber, saleNumber);
        this.purchaseOrderSearchQueryService.addGlobalSearchFilterValue(keyword);

        const url = this.appMainState.linkSet.get(PickupLinkType.eventPickupSearch.toString());
        this.navigateToPickups(siteId, eventId, url);
    }

    public configureEventPickupWithState(siteId: number, eventId: number, saleNumber: string, state: string): void {
        this.purchaseOrderSearchQueryService.clear();
        this.purchaseOrderSearchQueryService.setSearchView(PickupSearchViewEnum.Event);
        this.purchaseOrderSearchQueryService.addPicklistFilterColumnNameValue(PickupColumnVariableName.saleNumber, saleNumber);

        this.purchaseOrderSearchQueryService.addPicklistFilterColumnNameValue(PickupColumnVariableName.status, state);

        const url = this.appMainState.linkSet.get(PickupLinkType.eventPickupSearch.toString());
        this.navigateToPickups(siteId, eventId, url);
    }

    private navigateToPickups(siteId: number, eventId: number, url: string): void {
        if (url) {
            let builder = AidUrlUtil.getInstance().getUrlBuilder(url);
            builder.setNamedParameter('siteId', siteId.toString());
            if (eventId && eventId > 0) {
              builder.setNamedParameter('eventId', eventId.toString());
            }
            this.router.navigateByUrl(builder.get());
        }
    }
}
