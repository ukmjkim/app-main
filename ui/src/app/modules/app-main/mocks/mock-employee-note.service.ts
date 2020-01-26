import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { delay, map } from 'rxjs/operators';
import { AidLoggerService } from '@ukmjkim/aid-lib-services';
import { EmployeeNote } from '../models/employee-note';
import { EmployeeNoteService } from '../services/employee-note.service';
import { EMPLOYEE_NOTE_JSON } from './mock-employee-note';

@Injectable()
export class MockEmployeeNoteService extends EmployeeNoteService {
    constructor(private logger: AidLoggerService) {
        super();
    }


    setUXOnly(isUXOnly: boolean) {
      this.isUXOnly = isUXOnly;
    }

    getEmployeeNoteList(id: number): void {
      this.logger.info('EmployeeNoteService > getEmployeeNoteList - id:' + id);
      this.data.employeeNoteList = Object.assign([], EMPLOYEE_NOTE_JSON);
      this.logger.info(this.data.employeeNoteList);
      this.employeeNoteServiceCallback.next(this.data.employeeNoteList);
      return;
    }

    addEmployeeNote(id: number, note: EmployeeNote): Observable<any> {
      return of(Object.assign(new EmployeeNote()))
        .pipe(
          delay(500),
          map(obj => {
            return obj;
          })
        );
    }

    updateEmployeeNote(id: number, note: EmployeeNote): Observable<any> {
      return of(Object.assign(new EmployeeNote()))
        .pipe(
          delay(500),
          map(obj => {
            return obj;
          })
        );
    }
}
