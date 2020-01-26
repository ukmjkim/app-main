import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { setAppInjector } from '@app/app-injector';
import { BagListComponent } from './components/bag-list/bag-list.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { DryerLogListComponent } from './components/dryer-log-list/dryer-log-list.component';
import { DryerListComponent } from './components/dryer-list/dryer-list.component';
import { DryingOrderListComponent } from './components/drying-order-list/drying-order-list.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { FarmListComponent } from './components/farm-list/farm-list.component';
import { ReleaseOrderBagListComponent } from './components/release-order-bag-list/release-order-bag-list.component';
import { ReleaseOrderListComponent } from './components/release-order-list/release-order-list.component';
import { RoleListComponent } from './components/role-list/role-list.component';
import { TestingCOALogListComponent } from './components/testing-coa-log-list/testing-coa-log-list.component';
import { WorkHourListComponent } from './components/work-hour-list/work-hour-list.component';
import { WorkShiftListComponent } from './components/work-shift-list/work-shift-list.component';

import { ReleaseOrderDashboardComponent } from './components/release-order-dashboard/release-order-dashboard.component';
import { PickupDashboardComponent } from './components/pickup-dashboard/pickup-dashboard.component';
import { PickupComponent } from './components/pickup/pickup.component';
import { PickupLotConfigComponent } from './components/pickup-lot-config/pickup-lot-config.component';
import { PickupScheduleComponent } from './components/pickup-schedule/pickup-schedule.component';

import { SandboxEmployeeComponent } from './components/sandbox-employee/sandbox-employee.component';
import { SandboxEditEmployeeComponent } from './components/sandbox-edit-employee/sandbox-edit-employee.component';
import { SandboxEmployeeDashboardComponent } from './components/sandbox-employee-dashboard/sandbox-employee-dashboard.component';
import { SandboxViewComponent } from './sandbox-view/sandbox-view.component';
import { SandboxRoutingModule } from './sandbox-routing.module';
import { AppMaterialModule } from '../app-material.module';
import { AppLibraryModules } from '../app-library-modules';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SandboxRoutingModule,
    AppMaterialModule,
    AppLibraryModules
  ],
  exports: [
    SandboxViewComponent
  ],
  declarations: [
    BagListComponent,
    CustomerListComponent,
    DryerLogListComponent,
    DryerListComponent,
    DryingOrderListComponent,
    EmployeeListComponent,
    FarmListComponent,
    ReleaseOrderBagListComponent,
    ReleaseOrderListComponent,
    RoleListComponent,
    TestingCOALogListComponent,
    WorkHourListComponent,
    WorkShiftListComponent,

    ReleaseOrderDashboardComponent,

    PickupDashboardComponent,
    PickupComponent,
    PickupLotConfigComponent,
    PickupScheduleComponent,

    SandboxEmployeeComponent,
    SandboxEditEmployeeComponent,
    SandboxEmployeeDashboardComponent,
    SandboxViewComponent
  ]
})
export class SandboxModule  {
  constructor(injector: Injector) {
    setAppInjector(injector);
  }
}
