import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';
import { AidLoggerService, AidHttpOptions } from '@ukmjkim/aid-lib-services';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee';
import { EmployeeAuctionItemDto } from '../models/employee-auction-item-dto';
import { EmployeeAssetItemDto } from '../models/employee-asset-item-dto';
import { MockEmployeeService } from '../mocks/mock-employee.service';

@Injectable({
    providedIn: 'root'
})
export class EmployeeServiceImpl extends EmployeeService {

    constructor(private http: HttpClient, private logger: AidLoggerService) {
        super();
    }

    setUXOnly(isUXOnly: boolean) {
      this.isUXOnly = isUXOnly;
    }

    getEmployee(id: number): Observable<Employee> {
      if (this.isUXOnly) {
        return new MockEmployeeService(this.logger).getEmployee(id);
      }

      const searchUri = this.searchUri.replace(':id', String(id));
      return this.http.get(searchUri)
      .pipe(
          map(json => Object.assign(new Employee(), json))
      );
    }

    getEmployeeAssetList(id: number): Observable<EmployeeAssetItemDto[]> {
      if (this.isUXOnly) {
        return new MockEmployeeService(this.logger).getEmployeeAssetList(id);
      }

      const searchUri = this.searchUri.replace(':id', String(id));
      return this.http.get(searchUri)
      .pipe(
          map(json => Object.assign([], json))
      );
    }

    getEmployeeAuctionList(id: number): Observable<EmployeeAuctionItemDto[]> {
      if (this.isUXOnly) {
        return new MockEmployeeService(this.logger).getEmployeeAuctionList(id);
      }

      const searchUri = this.searchUri.replace(':id', String(id));
      return this.http.get(searchUri)
      .pipe(
          map(json => Object.assign([], json))
      );
    }
}
