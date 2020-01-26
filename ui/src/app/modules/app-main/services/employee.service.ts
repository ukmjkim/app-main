import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Employee } from '../models/employee';
import { EmployeeAssetItemDto } from '../models/employee-asset-item-dto';
import { EmployeeAuctionItemDto } from '../models/employee-auction-item-dto';

@Injectable({
  providedIn: 'root'
})
export abstract class EmployeeService {
  protected isUXOnly = false;

  public searchUri = '/api/sites/:siteId/auction-events/:eventId/seller-costs/contracts/:id';

  protected constructor() { }

  abstract setUXOnly(isUXOnly: boolean);
  abstract getEmployee(id: number): Observable<Employee>;
  abstract getEmployeeAssetList(id: number): Observable<EmployeeAssetItemDto[]>;
  abstract getEmployeeAuctionList(id: number): Observable<EmployeeAuctionItemDto[]>;
}
