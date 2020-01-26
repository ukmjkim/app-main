import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AidUrlUtil } from '@ukmjkim/aid-lib-services';
import { AppMainState } from '../../models/app-main-state';
import { EmployeeSearchViewEnum } from './conf/employee-search-view.enum';
import { EmployeeSearchQueryService } from './employee-search-query.service';
import { EmployeeSearchColumnVariableName } from './conf/employee-search-column-variable-name.conf';
import { EmployeeLinkType } from '../../constants/employee-link-type';

@Injectable({
    providedIn: 'root'
})
export class EmployeeSearchMethodService {
  appMainState: AppMainState;

    constructor(
        private router: Router,
        private employeeSearchQueryService: EmployeeSearchQueryService) {
    }

    public setAppMainState(appMainState: AppMainState) {
      this.appMainState = appMainState;
    }

    // For Side Bar - routerLink will navigate the page
    public configureContractNoNavChange() {
      this.employeeSearchQueryService.clear();
      this.employeeSearchQueryService.setSearchView(EmployeeSearchViewEnum.Default);
  }

  public configureDefaultView(searchKeyword: string) {
    this.employeeSearchQueryService.clear();
    this.employeeSearchQueryService.setSearchView(EmployeeSearchViewEnum.Default);

    const url = this.appMainState.linkSet.get(EmployeeLinkType.employeeSearch.toString());
    this.navigateToContracts(url);
  }

  public configureDefaultViewBySearchKeyword(searchKeyword: string) {
    this.employeeSearchQueryService.clear();
    this.employeeSearchQueryService.setSearchView(EmployeeSearchViewEnum.Default);
    this.employeeSearchQueryService.addGlobalSearchFilterValue(searchKeyword);

    const url = this.appMainState.linkSet.get(EmployeeLinkType.employeeSearch.toString());
    this.navigateToContracts(url);
  }

  public configureContractByContractType(contractType: string) {
      this.employeeSearchQueryService.clear();
      this.employeeSearchQueryService.setSearchView(EmployeeSearchViewEnum.Default);
      this.employeeSearchQueryService.addPicklistFilterColumnNameValue(EmployeeSearchColumnVariableName.dashboardContractType, contractType);

      const url = this.appMainState.linkSet.get(EmployeeLinkType.employeeSearch.toString());
      this.navigateToContracts(url);
  }

  public configureContractByContractStatus(contractStatus: string) {
    this.employeeSearchQueryService.clear();
    this.employeeSearchQueryService.setSearchView(EmployeeSearchViewEnum.Default);
    this.employeeSearchQueryService.addPicklistFilterColumnNameValue(EmployeeSearchColumnVariableName.contractStatus, contractStatus);

    const url = this.appMainState.linkSet.get(EmployeeLinkType.employeeSearch.toString());
    this.navigateToContracts(url);
  }

  private navigateToContracts(url: string): void {
    if (url) {
      const builder = AidUrlUtil.getInstance().getUrlBuilder(url);
      this.router.navigateByUrl(builder.get());
    }
  }
}
