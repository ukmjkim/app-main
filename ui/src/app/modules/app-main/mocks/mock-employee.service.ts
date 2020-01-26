import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { delay, map } from 'rxjs/operators';
import { AidLoggerService } from '@ukmjkim/aid-lib-services';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee';
import { EmployeeAuctionItemDto } from '../models/employee-auction-item-dto';
import { EmployeeAssetItemDto } from '../models/employee-asset-item-dto';
import { EMPLOYEE_JSON_STRING } from './mock-employee';
import { EMPLOYEE_AUCTION_LIST_JSON } from './mock-employee-auction-list';
import { EMPLOYEE_ASSET_LIST_JSON } from './mock-employee-asset-list';

@Injectable({
  providedIn: 'root'
})
export class MockEmployeeService extends EmployeeService {
  constructor(private logger: AidLoggerService) {
    super();
  }

  setUXOnly(isUXOnly: boolean) {
    this.isUXOnly = isUXOnly;
  }

  getEmployee(id: number): Observable<Employee> {
    return of(Object.assign(new Employee(), EMPLOYEE_JSON_STRING))
      .pipe(
        delay(500),
        map(data => {
          return data;
        })
      );
  }

  getEmployeeAssetList(id: number): Observable<EmployeeAssetItemDto[]> {
    return of(Object.assign([], EMPLOYEE_ASSET_LIST_JSON))
      .pipe(
        delay(500),
        map(data => {
          return data;
        })
      );
  }

  getEmployeeAuctionList(id: number): Observable<EmployeeAuctionItemDto[]> {
    return of(Object.assign([], EMPLOYEE_AUCTION_LIST_JSON))
      .pipe(
        delay(500),
        map(data => {
          return data;
        })
      );
  }
}
