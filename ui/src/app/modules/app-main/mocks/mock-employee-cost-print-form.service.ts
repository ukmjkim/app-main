import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { delay, map } from 'rxjs/operators';
import { AidLoggerService } from '@ukmjkim/aid-lib-services';
import { EmployeeCostPrintFormService } from '../services/employee-cost-print-form.service';
import { EmployeeCostPrintFormDto } from '../models/employee-cost-print-form-dto';
import { EMPLOYEE_COST_PRINT_FORM_JSON } from './mock-employee-cost-print-form';

@Injectable({
    providedIn: 'root'
})
export class MockEmployeeCostPrintFormService extends EmployeeCostPrintFormService {
    constructor(private logger: AidLoggerService) {
        super();
    }

    setUXOnly(isUXOnly: boolean) {
      this.isUXOnly = isUXOnly;
    }

    getEmployeeCostPrintFormData(idList: Array<number>): Observable<EmployeeCostPrintFormDto[]> {
      return of(Object.assign([], EMPLOYEE_COST_PRINT_FORM_JSON))
      .pipe(
        delay(500),
        map(data => {
          return data;
        })
      );
    }
}
