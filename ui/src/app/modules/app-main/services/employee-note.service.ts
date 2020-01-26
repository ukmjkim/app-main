import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { EmployeeNote } from '../models/employee-note';

@Injectable({
  providedIn: 'root'
})
export abstract class EmployeeNoteService {
  protected isUXOnly = false;

  data = {
    employeeNoteList: Array<EmployeeNote>()
  };
  public employeeNoteServiceCallback: Subject<EmployeeNote[]> = new Subject<EmployeeNote[]>();
  public employeeNoteSubject: Subject<EmployeeNote> = new Subject<EmployeeNote>();

  protected constructor() { }

  abstract setUXOnly(isUXOnly: boolean);
  abstract getEmployeeNoteList(id: number): void;
  abstract addEmployeeNote(id: number, note: EmployeeNote): Observable<any>;
  abstract updateEmployeeNote(id: number, note: EmployeeNote): Observable<any>;
}
