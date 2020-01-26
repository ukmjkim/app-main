import { Injectable } from '@angular/core';
import { AidLocalStorageUtil } from '@ukmjkim/aid-lib-services';
import { AppMainPermissionType } from '../../models/app-main-permission-type.enum';
import { AppMainState } from '../../models/app-main-state';
import { RemoteQueryService } from '@ukmjkim/aid-data-table';
import { EmployeeSearchDefaultColumnsMap } from './conf/employee-search-view-template';
import { employeeSearchConfigs } from './conf/employee-search-config';

@Injectable({
  providedIn: 'root'
})
export class EmployeeSearchQueryService extends RemoteQueryService {
  private appMainState: AppMainState;

  constructor() {
    super();
    this.searchDefaultColumnsMap = EmployeeSearchDefaultColumnsMap;
  }

  setAppMainState(appMainState: AppMainState) {
    this.appMainState = appMainState;
  }

  loadConfiguration() {
    this.cacheKey = AidLocalStorageUtil.generateCacheKey(
      this.appMainState.userId,
      0,
      0,
      employeeSearchConfigs.employeeSearchOptions);
  }
}
