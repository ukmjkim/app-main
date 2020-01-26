import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ChartsModule } from 'ng2-charts';
import { AppMaterialModule } from '../../app-material.module';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { DataTableModule } from '@ukmjkim/aid-data-table';
import { AidUXComponentsModule } from '@ukmjkim/aid-ux-components';
import { AidLibServicesModule, AidMessageDialogComponent, AidProgressDialogComponent } from '@ukmjkim/aid-lib-services';
import { SignInFormComponent } from './shared/components/sign-in-form/sign-in-form.component';

import { Services } from './app-main-services';
import { FilterTextRangeOwnerCodeService } from './services/filter-text-range-owner-code.service';
import { ContentDataService } from './services/content-data.service';
import { EmployeeService } from './services/employee.service';
import { EmployeeSearchService } from './services/employee-search.service';
import { EmployeeCostPrintFormService } from './services/employee-cost-print-form.service';
import { PickupService } from './services/pickup.service';
import { PickupDashboardStatsService } from './services/pickup-dashboard-stats.service';
import { PickupSearchService } from './services/pickup-search.service';

import { ContentDataComponent } from './components/content-data/content-data.component';
import { ContentDataTableComponent } from './components/content-data-table/content-data-table.component';

import { ContentDataBagComponent } from './components/content-data-form/content-data-bag/content-data-bag.component';
import { ContentDataCustomerComponent } from './components/content-data-form/content-data-customer/content-data-customer.component';
import { ContentDataDryerLogComponent } from './components/content-data-form/content-data-dryer-log/content-data-dryer-log.component';
import { ContentDataDryerComponent } from './components/content-data-form/content-data-dryer/content-data-dryer.component';
import { ContentDataDryingOrderComponent } from './components/content-data-form/content-data-drying-order/content-data-drying-order.component';
import { ContentDataEmployeeComponent } from './components/content-data-form/content-data-employee/content-data-employee.component';
import { ContentDataFarmComponent } from './components/content-data-form/content-data-farm/content-data-farm.component';
import { ContentDataReleaseOrderBagComponent } from './components/content-data-form/content-data-release-order-bag/content-data-release-order-bag.component';
import { ContentDataReleaseOrderComponent } from './components/content-data-form/content-data-release-order/content-data-release-order.component';
import { ContentDataReleaseOrderAssignBagsComponent } from './components/content-data-form/content-data-release-order-assign-bags/content-data-release-order-assign-bags.component';
import { ContentDataRoleComponent } from './components/content-data-form/content-data-role/content-data-role.component';
import { ContentDataTestingCOALogComponent } from './components/content-data-form/content-data-testing-coa-log/content-data-testing-coa-log.component';
import { ContentDataWorkHourComponent } from './components/content-data-form/content-data-work-hour/content-data-work-hour.component';
import { ContentDataWorkShiftComponent } from './components/content-data-form/content-data-work-shift/content-data-work-shift.component';
import { ContentDataWorkShiftAssignWorkersComponent } from './components/content-data-form/content-data-work-shift-assign-workers/content-data-work-shift-assign-workers.component';

import { ContentDashboardComponent } from './components/content-dashboard/content-dashboard.component';
import { ContentDashboardReleaseOrderComponent } from './components/content-dashboard/content-dashboard-release-order/content-dashboard-release-order.component';
import { ContentDashboardTestingCOALogComponent } from './components/content-dashboard/content-dashboard-testing-coa-log/content-dashboard-testing-coa-log.component';

import { EmployeeDashboardComponent } from './components/employee-dashboard/employee-dashboard.component';
import { EmployeeDetailsDashboardComponent } from './components/employee-details-dashboard/employee-details-dashboard.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { EmployeeSearchComponent } from './components/employee-search/employee-search.component';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';
import { EditEmployeeDetailsComponent } from './components/edit-employee/edit-employee-details/edit-employee-details.component';
import { EmployeeActionComponent } from './components/employee-action/employee-action.component';
import { EmployeeNoteComponent } from './components/employee-note/employee-note.component';
import { EmployeePrintFormComponent } from './components/employee-print-form/employee-print-form.component';
import { PickupDashboardComponent } from './components/pickup-dashboard/pickup-dashboard.component';
import { PickupComponent } from './components/pickup/pickup.component';
import { PickupSearchComponent } from './components/pickup-search/pickup-search.component';
import { PickupLotConfigComponent } from './components/pickup-lot-config/pickup-lot-config.component';
import { PickupScheduleComponent } from './components/pickup-schedule/pickup-schedule.component';
import { PickupCalendarComponent } from './components/pickup-schedule/pickup-calendar/pickup-calendar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    NgSelectModule,
    ChartsModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    DataTableModule,
    AidUXComponentsModule,
    AidLibServicesModule
  ],
  declarations: [
    SignInFormComponent,
    ContentDataComponent,
    ContentDataTableComponent,
    ContentDataBagComponent,
    ContentDataCustomerComponent,
    ContentDataDryerLogComponent,
    ContentDataDryerComponent,
    ContentDataDryingOrderComponent,
    ContentDataEmployeeComponent,
    ContentDataFarmComponent,
    ContentDataReleaseOrderBagComponent,
    ContentDataReleaseOrderComponent,
    ContentDataReleaseOrderAssignBagsComponent,
    ContentDataRoleComponent,
    ContentDataTestingCOALogComponent,
    ContentDataWorkHourComponent,
    ContentDataWorkShiftComponent,
    ContentDataWorkShiftAssignWorkersComponent,

    ContentDashboardComponent,
    ContentDashboardReleaseOrderComponent,
    ContentDashboardTestingCOALogComponent,

    EmployeeDashboardComponent,
    EmployeeDetailsDashboardComponent,
    EmployeeComponent,
    EmployeeSearchComponent,
    EditEmployeeComponent,
    EditEmployeeDetailsComponent,
    EmployeeActionComponent,
    EmployeeNoteComponent,
    EmployeePrintFormComponent,

    PickupDashboardComponent,
    PickupComponent,
    PickupSearchComponent,
    PickupLotConfigComponent,
    PickupScheduleComponent,
    PickupCalendarComponent
  ],
  providers: [
    DatePipe,
    FilterTextRangeOwnerCodeService,
    { provide: ContentDataService, useClass: Services.ContentDataService },
    { provide: EmployeeService, useClass: Services.EmployeeService },
    { provide: EmployeeSearchService, useClass: Services.EmployeeSearchService },
    { provide: EmployeeCostPrintFormService, useClass: Services.EmployeeCostPrintFormService},
    { provide: PickupService, useClass: Services.PickupService},
    { provide: PickupDashboardStatsService, useClass: Services.PickupDashboardStatsService },
    { provide: PickupSearchService, useClass: Services.PickupSearchService},
  ],
  entryComponents: [
    AidMessageDialogComponent,
    AidProgressDialogComponent,
    SignInFormComponent,
    ContentDataBagComponent,
    ContentDataCustomerComponent,
    ContentDataDryerLogComponent,
    ContentDataDryerComponent,
    ContentDataDryingOrderComponent,
    ContentDataEmployeeComponent,
    ContentDataFarmComponent,
    ContentDataReleaseOrderBagComponent,
    ContentDataReleaseOrderComponent,
    ContentDataReleaseOrderAssignBagsComponent,
    ContentDataRoleComponent,
    ContentDataTestingCOALogComponent,
    ContentDataWorkHourComponent,
    ContentDataWorkShiftComponent,
    ContentDataWorkShiftAssignWorkersComponent,
  ],
  exports: [
    SignInFormComponent,
    ContentDataComponent,
    ContentDataTableComponent,
    ContentDataBagComponent,
    ContentDataCustomerComponent,
    ContentDataDryerLogComponent,
    ContentDataDryerComponent,
    ContentDataDryingOrderComponent,
    ContentDataEmployeeComponent,
    ContentDataFarmComponent,
    ContentDataReleaseOrderBagComponent,
    ContentDataReleaseOrderComponent,
    ContentDataReleaseOrderAssignBagsComponent,
    ContentDataRoleComponent,
    ContentDataTestingCOALogComponent,
    ContentDataWorkHourComponent,
    ContentDataWorkShiftComponent,
    ContentDataWorkShiftAssignWorkersComponent,

    ContentDashboardComponent,
    ContentDashboardReleaseOrderComponent,
    ContentDashboardTestingCOALogComponent,

    EmployeeDashboardComponent,
    EmployeeDetailsDashboardComponent,
    EmployeeComponent,
    EmployeeSearchComponent,
    EditEmployeeComponent,
    EditEmployeeDetailsComponent,
    EmployeeActionComponent,
    EmployeeNoteComponent,
    EmployeePrintFormComponent,

    PickupDashboardComponent,
    PickupComponent,
    PickupSearchComponent,
    PickupLotConfigComponent,
    PickupScheduleComponent,
    PickupCalendarComponent
  ]
})
export class AppMainModule {
  static forRoot() {
    return {
      ngModule: AppMainModule
    };
  }
}
