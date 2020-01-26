import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { AidLoggerService, AidHttpOptions } from '@ukmjkim/aid-lib-services';
import { EmployeeCostPrintFormService } from './employee-cost-print-form.service';
import { EmployeeCostPrintFormDto } from '../models/employee-cost-print-form-dto';
import { MockEmployeeCostPrintFormService } from '../mocks/mock-employee-cost-print-form.service';

@Injectable({
    providedIn: 'root'
})
export class EmployeeCostPrintFormServiceImpl extends EmployeeCostPrintFormService {

    constructor(private http: HttpClient, private logger: AidLoggerService) {
        super();
    }

    setUXOnly(isUXOnly: boolean) {
      this.isUXOnly = isUXOnly;
    }

    getEmployeeCostPrintFormData(ids: Array<number>): Observable<EmployeeCostPrintFormDto[]> {
      if (this.isUXOnly) {
        return new MockEmployeeCostPrintFormService(this.logger).getEmployeeCostPrintFormData(ids);
      }

      let ownerIdListParam = JSON.stringify(ids);

      ownerIdListParam = ownerIdListParam.replace('[', '');
      ownerIdListParam = ownerIdListParam.replace(']', '');

      let url = this.sellerContractCostPrintFormUrl;
      url = url.replace(':ids', ownerIdListParam);

      return this.http.get(url)
      .pipe(
          map((data: EmployeeCostPrintFormDto[]) => data.map(data => Object.assign(new EmployeeCostPrintFormDto(), data))),
          catchError((err: any, caught: Observable<EmployeeCostPrintFormDto[]>) => {
              return Observable.throw(err);
          })
        );
    }
}
