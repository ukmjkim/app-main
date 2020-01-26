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

import { SandboxEmployeeDashboardComponent } from './components/sandbox-employee-dashboard/sandbox-employee-dashboard.component';
import { SandboxEmployeeComponent } from './components/sandbox-employee/sandbox-employee.component';
import { SandboxEditEmployeeComponent } from './components/sandbox-edit-employee/sandbox-edit-employee.component';

interface SandboxRoute {
  path: string;
  displayName: string;
  component: any;
}

export const SandboxRoutes: SandboxRoute[] = [
  { path: 'pickup/dashboard', displayName: 'Pickup Dashboard', component: PickupDashboardComponent },
  { path: 'pickup/search', displayName: 'Pickup Search', component: PickupComponent },
  { path: 'pickup/lot-config', displayName: 'Pickup Lot Config', component: PickupLotConfigComponent },
  { path: 'pickup/schedule', displayName: 'Pickup Calendar', component: PickupScheduleComponent },

  // { path: 'employees/overview', displayName: 'Dashboard', component: SandboxEmployeeDashboardComponent },
  // { path: 'bags/list', displayName: 'Bags', component: BagListComponent },
  // { path: 'contacts/list', displayName: 'Contacts', component: CustomerListComponent },
  // { path: 'dryer-logs/list', displayName: 'Dryer Logs', component: DryerLogListComponent },
  // { path: 'dryer/list', displayName: 'Dryers', component: DryerListComponent },
  // { path: 'drying-orders/list', displayName: 'Drying Orders', component: DryingOrderListComponent },
  // { path: 'employees/list', displayName: 'Employees', component: EmployeeListComponent },
  // { path: 'farms/list', displayName: 'Farms', component: FarmListComponent },
  // { path: 'release-order-bags/list', displayName: 'Release Order Bags', component: ReleaseOrderBagListComponent },
  // { path: 'release-orders/dashboard', displayName: 'Release Orders Dashboard', component: ReleaseOrderDashboardComponent },
  // { path: 'release-orders/list', displayName: 'Release Orders', component: ReleaseOrderListComponent },
  // //{ path: 'roles/list', displayName: 'Roles', component: RoleListComponent },
  // { path: 'testing-coa-logs/list', displayName: 'Testing COA Logs', component: TestingCOALogListComponent },
  // { path: 'work-hours/list', displayName: 'Work Hours', component: WorkHourListComponent },
  // { path: 'work-shifts/list', displayName: 'Work Shifts', component: WorkShiftListComponent },
];
