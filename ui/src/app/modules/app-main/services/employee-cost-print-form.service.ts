import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { EmployeeCostPrintFormDto } from '../models/employee-cost-print-form-dto';

@Injectable({
    providedIn: 'root'
})
export abstract class EmployeeCostPrintFormService {
  protected isUXOnly = false;

  public sellerContractCostPrintFormUrl = '/api/sites/:siteId/auction-events/:eventId/seller-costs/contracts/print-form?contractIds=:ids';

  protected constructor() { }

  abstract setUXOnly(isUXOnly: boolean);
  abstract getEmployeeCostPrintFormData(ids: Array<number>): Observable<EmployeeCostPrintFormDto[]>;
}
