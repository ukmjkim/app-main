import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { EmployeeDashboardTypeStatsDto } from '../models/employee-dashboard-type-stats-dto';
import { EmployeeSearchResultDto } from '../models/employee-search-result-dto';

@Injectable()
export abstract class EmployeeSearchService {
  protected isUXOnly = false;

  public employeeStatsInEventUrl = '/api/auction-events/:eventId/seller-contracts/overview';
  public employeeSearchInEventUrl = '/api/auction-events/:eventId/seller-contracts/search';
  public employeeSearchMaxMinValuesInEventUrl = '/api/auction-events/:eventId/seller-contracts/max-min-values';
  public employeeBulkUpdateConfidentialInEventUrl = '/api/auction-events/:eventId/seller-contracts/bulk-update-confidential';

  protected constructor() {}

  abstract setUXOnly(isUXOnly: boolean);
  abstract getEmployeeStats(): Observable<EmployeeDashboardTypeStatsDto>;
  abstract getEmployeeSearchById(searchQueryString: string): Observable<EmployeeSearchResultDto>;
  abstract getEmployeeSearchPrerequisiteData(): Observable<any[]>;
}
