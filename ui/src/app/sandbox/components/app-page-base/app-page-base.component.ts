import { Injector } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { appConfig } from '@app/app.config';
import { appInjector } from '@app/app-injector';
import { AppMainState } from '@modules/app-main';
import { AppMainPermissionType } from '@modules/app-main';
import { EmployeeLinkType } from '@modules/app-main';
import { environment } from '@environments/environment';

export abstract class AppPageBaseComponent {

  public appInjector: Injector;
  public appMainState: AppMainState;

  constructor(protected router: Router,
    protected route: ActivatedRoute,
    protected titleService: Title) {
    this.appInjector = appInjector;
    this.subscribeRoute();
  }

  private subscribeRoute() {
    this.route.params.subscribe(params => {
      this.init(params);
    });
  }

  private init(params) {
    console.log('AppPageBaseComponent init');
    this.setUpAidAppAdminState(params);
  }

  // For Package Library
  setUpAidAppAdminState(params) {
    this.appMainState = new AppMainState();

    this.setUpSiteEventEquipmentInfo();

    // Additional Id Setup
    if (!isNaN(parseInt(params['id'], 10)) && parseInt(params['id'], 10) > 0) {
      this.appMainState.id = parseInt(params['id'], 10);
    }

    this.appMainState.permissionSet = this.setPermissionTypes();
    this.appMainState.linkSet = this.setLinks();
  }

  // For Package Library
  reloadAidAppAdminState() {
    this.setUpSiteEventEquipmentInfo();
  }

  private setUpSiteEventEquipmentInfo() {
    this.appMainState.isUXOnly = environment.isUxOnly;
    this.appMainState.siteId = 53;
    this.appMainState.siteName = 'Orlando';
    this.appMainState.eventId = 102650;
    this.appMainState.eventName = 'Orlando, FL, USA - May 22, 2019';
    this.appMainState.saleNumber = '2019190';
    this.appMainState.userId = 1024876;
    this.appMainState.userName = 'jsmith';
    this.appMainState.fullName = 'John Smith';
    this.appMainState.dateFormat = appConfig.dateFormat;
    this.appMainState.dateTimeFormat = appConfig.dateTimeFormat;
  }

  // For Package Library
  // Example
  // let permissionSet: Map<AppMainPermissionType, boolean> = new Map<AppMainPermissionType, boolean>();
  // permissionSet.set(AppMainPermissionType.CanViewPODetails, PermissionUtils.hasPermission(this.siteAdminService, permissionType.canViewPODetails));
  // permissionSet.set(AppMainPermissionType.CanManagePODetails, PermissionUtils.hasPermission(this.siteAdminService, permissionType.canManagePODetails));
  abstract setPermissionTypes(): Map<string, boolean>;

  abstract setLinks(): Map<string, string>;

  setPermissionTypesForEmployee(): Map<string, boolean> {
    const permissionSet: Map<string, boolean> = new Map<string, boolean>();
    permissionSet.set(AppMainPermissionType.canViewEmployee.type, true);
    permissionSet.set(AppMainPermissionType.canManageEmployee.type, true);

    return permissionSet;
  }

  setLinksForEmployee(): Map<string, string> {
    const linkSet: Map<string, string> = new Map<string, string>();
    linkSet.set(EmployeeLinkType.employeeSearch.toString(), '/seller-contracts/search');
    linkSet.set(EmployeeLinkType.employeeDetail.toString(), '/seller-contracts/:id/edit');
    linkSet.set(EmployeeLinkType.employeeDetailOnNewTab.toString(), '/seller-contracts/:id/edit');
    linkSet.set(EmployeeLinkType.employeePrintForm.toString(), '/#/print-form/sites/:siteId/events/:eventId/seller-costs/contracts/:ids');
    linkSet.set(EmployeeLinkType.equipSummary.toString(), '#');
    linkSet.set(EmployeeLinkType.purchaseOrderDetail.toString(), '#');

    return linkSet;
  }
}
