import { Injectable } from '@angular/core';
import { AidLocalStorageUtil } from '@ukmjkim/aid-lib-services';
import { AppMainPermissionType } from '../../models/app-main-permission-type.enum';
import { AppMainState } from '../../models/app-main-state';
import { RemoteQueryService } from '@ukmjkim/aid-data-table';
import { PickupSearchDefaultColumnsMap } from './conf/pickup-search-view-template';
import { pickupSearchConfigs } from './conf/pickup-search-config';

@Injectable({
  providedIn: 'root'
})
export class PickupSearchQueryService extends RemoteQueryService {
  private appMainState: AppMainState;

  constructor() {
    super();
  }

  setAppMainState(appMainState: AppMainState) {
    this.appMainState = appMainState;
  }

  loadConfiguration() {
    this.cacheKey = AidLocalStorageUtil.generateCacheKey(
      this.appMainState.userId,
      this.appMainState.siteId,
      this.appMainState.eventId,
      pickupSearchConfigs.pickupSearchOptions);
    this.searchDefaultColumnsMap = PickupSearchDefaultColumnsMap;
  }
}
