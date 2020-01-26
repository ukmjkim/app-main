import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { AidHttpOptions, AidLoggerService } from '@ukmjkim/aid-lib-services';
import { EmployeeDashboardTypeStatsDto } from '../models/employee-dashboard-type-stats-dto';
import { EmployeeSearchResultDto } from '../models/employee-search-result-dto';
import { EmployeeSearchService } from './employee-search.service';
import { MockEmployeeSearchService } from '../mocks/mock-employee-search.service';

@Injectable()
export class EmployeeSearchServiceImpl extends EmployeeSearchService {

  private searchString: string;

  constructor(private http: HttpClient,
              private logger: AidLoggerService) {
    super();
  }

  setUXOnly(isUXOnly: boolean) {
    this.isUXOnly = isUXOnly;
  }

  getEmployeeStats(): Observable<EmployeeDashboardTypeStatsDto> {
    if (this.isUXOnly) {
      return new MockEmployeeSearchService(this.logger).getEmployeeStats();
    }

    const searchUri = this.employeeStatsInEventUrl;
    return this.http.get(searchUri)
            .pipe(
                map(json => Object.assign(new EmployeeDashboardTypeStatsDto(), json))
            );
  }

  getEmployeeSearchById(searchQueryString: string): Observable<EmployeeSearchResultDto> {
    if (this.isUXOnly) {
      return new MockEmployeeSearchService(this.logger).getEmployeeSearchById(searchQueryString);
    }

    const searchUri = this.employeeSearchInEventUrl;
    const body = searchQueryString;
    return this.http.post<EmployeeSearchResultDto>(searchUri, body, AidHttpOptions.json());
  }

  getEmployeeSearchPrerequisiteData(): Observable<any[]> {
    if (this.isUXOnly) {
      return new MockEmployeeSearchService(this.logger).getEmployeeSearchPrerequisiteData();
    }

    const maxMinValueUrl = this.employeeSearchMaxMinValuesInEventUrl;

    const maxMinValueUrlHttp = this.http.get(maxMinValueUrl, AidHttpOptions.json());

    return forkJoin([maxMinValueUrlHttp]);
  }
}
