import { ContentDataServiceImpl } from './services/content-data-impl.service';
import { EmployeeServiceImpl } from './services/employee-impl.service';
import { EmployeeSearchServiceImpl } from './services/employee-search-impl.service';
import { EmployeeCostPrintFormServiceImpl } from './services/employee-cost-print-form-impl.service';
import { PickupServiceImpl } from './services/pickup-impl.service';
import { PickupSearchServiceImpl } from './services/pickup-search-impl.service';
import { PickupDashboardStatsServiceImpl } from './services/pickup-dashboard-stats-impl.service';

export const Services = {
  ContentDataService: ContentDataServiceImpl,
  EmployeeService: EmployeeServiceImpl,
  EmployeeSearchService: EmployeeSearchServiceImpl,
  EmployeeCostPrintFormService: EmployeeCostPrintFormServiceImpl,
  PickupService: PickupServiceImpl,
  PickupDashboardStatsService: PickupDashboardStatsServiceImpl,
  PickupSearchService: PickupSearchServiceImpl
};
