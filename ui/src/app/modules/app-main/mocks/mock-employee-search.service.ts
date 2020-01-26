import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { delay, map } from 'rxjs/operators';
import { AidLoggerService } from '@ukmjkim/aid-lib-services';
import { EmployeeDashboardTypeStatsDto } from '../models/employee-dashboard-type-stats-dto';
import { EmployeeSearchResultDto } from '../models/employee-search-result-dto';
import { EmployeeSearchService } from '../services/employee-search.service';
import { EMPLOYEE_DASHBOARD_TYPE_STATS_JSON, EMPLOYEE_SEARCH_JSON, EMPLOYEE_SEARCH_MAX_MIN_JSON_STRING } from './mock-employee-search';

@Injectable()
export class MockEmployeeSearchService extends EmployeeSearchService {

    private searchString: string;

    constructor(private logger: AidLoggerService) {
        super();
    }

    setUXOnly(isUXOnly: boolean) {
      this.isUXOnly = isUXOnly;
    }

    getEmployeeStats(): Observable<EmployeeDashboardTypeStatsDto> {
      return of(Object.assign(new EmployeeDashboardTypeStatsDto(), EMPLOYEE_DASHBOARD_TYPE_STATS_JSON))
        .pipe(
          delay(500),
          map(obj => {
            return obj;
          })
        );
    }

    getEmployeeSearchById(searchQueryString: string): Observable<EmployeeSearchResultDto> {
      return of(Object.assign(new EmployeeSearchResultDto(), EMPLOYEE_SEARCH_JSON))
        .pipe(
          delay(500),
          map(obj => {
            return obj;
          })
        );
    }

    getEmployeeSearchPrerequisiteData(): Observable<string[]> {
      return new Observable(observer => {
        setInterval(() => {
          observer.next(JSON.parse(EMPLOYEE_SEARCH_MAX_MIN_JSON_STRING));
        }, 300);
      });
    }
}
