import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { AidLoggerService } from '@ukmjkim/aid-lib-services';
import { EmployeeNote } from '../models/employee-note';
import { AidHttpOptions } from '@ukmjkim/aid-lib-services';
import { EmployeeNoteService } from './employee-note.service';
import { MockEmployeeNoteService } from '../mocks/mock-employee-note.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeNoteServiceImpl extends EmployeeNoteService {

  getNoteListUrl = '/api/sites/:siteId/seller-contract/:id/notes';
  addEmployeeNoteUrl = '/api/sites/:siteId/seller-contract/:id/notes';
  updateEmployeeNoteUrl = '/api/sites/:siteId/seller-contract/:id/notes/:noteId';

  constructor(private http: HttpClient,
    private logger: AidLoggerService) {
    super();
  }

  setUXOnly(isUXOnly: boolean) {
    this.isUXOnly = isUXOnly;
  }

  getEmployeeNoteList(id: number): void {
    if (this.isUXOnly) {
      return new MockEmployeeNoteService(this.logger).getEmployeeNoteList(id);
    }

    this.logger.info('EmployeeNoteService > getEmployeeNoteList - id: ' + id);
    let url = this.getNoteListUrl;
    url = url.replace(':id', String(id));
    this.http.get(url, AidHttpOptions.json())
      .pipe(
        tap(() => this.logger.info('EmployeeNoteService > getEmployeeNoteList - Note data loaded from server : ', id))
      )
      .subscribe(response => {
        this.logger.info('EmployeeNoteService > getEmployeeNoteList', response);
        this.data.employeeNoteList = EmployeeNote.createSellerContractNoteListFromJson(response);
        this.logger.info('EmployeeNoteService > getEmployeeNoteList', this.data.employeeNoteList);
        this.employeeNoteServiceCallback.next(this.data.employeeNoteList);
      });
  }

  addEmployeeNote(id: number, note: EmployeeNote): Observable<any> {
    if (this.isUXOnly) {
      return new MockEmployeeNoteService(this.logger).addEmployeeNote(id, note);
    }

    this.logger.info('EmployeeNoteService > addNewEmployeeNote - id: ' + id);
    let url = this.addEmployeeNoteUrl;
    url = url.replace(':id', String(id));

    const body = JSON.stringify(note);
    this.logger.info('addEmployeeNote', body);

    return this.http.post(url, body, AidHttpOptions.json());
  }

  updateEmployeeNote(id: number, note: EmployeeNote): Observable<any> {
    if (this.isUXOnly) {
      return new MockEmployeeNoteService(this.logger).updateEmployeeNote(id, note);
    }

    this.logger.info('EmployeeNoteService > updateEmployeeNote - id: ' + id);
    let url = this.updateEmployeeNoteUrl;
    url = url.replace(':id', String(id));
    url = url.replace(':noteId', String(note.noteInfoId));

    const body = JSON.stringify(note);
    this.logger.info('updateEmployeeNote', body);

    return this.http.put(url, body, AidHttpOptions.json());
  }
}
