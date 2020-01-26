import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Inject } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { ColHeaderTypeEnum, LocalDataTableDataSource, FilterTypeEnum, Filter, PicklistFilter } from '@ukmjkim/aid-data-table';
import { AidLoggerService, AidDialogService, AidGlobalConfig, AidMessageIndicatorService, AidIndicatorParams } from '@ukmjkim/aid-lib-services';
import { AppMainPermissionType } from '../../models/app-main-permission-type.enum';
import { AppMainState } from '../../models/app-main-state';
import { EmployeeNoteService } from '../../services/employee-note.service';
import { EmployeeNote } from '../../models/employee-note';
import { COLUMNS, COLUMNS_AS_ARRAY } from './employee-note-table/employee-note-table-settings';
import { EmployeeActionType } from '../../constants/employee-action-type';

@Component({
  selector: 'aid-employee-note',
  templateUrl: './employee-note.component.html',
  styleUrls: ['./employee-note.component.scss']
})
export class EmployeeNoteComponent implements OnInit, OnDestroy {
  @ViewChild('noteDataTable', { static: false }) elementView: ElementRef;
  @ViewChild('noteInput', { static: false }) noteInput: ElementRef;

  public today = new Date();
  public employeeNote = new EmployeeNote();
  public employeeNoteList: EmployeeNote[] = [];

  public noteInfoCtrl: FormControl;

  public readonly MAX_TEXT_LENGTH: number = 400;

  public isAddNoteEnabled = false;

  public preSelectedPicklistFilter: Filter;
  dataSource: LocalDataTableDataSource<EmployeeNote>;
  readonly columnsToShow: string[];
  readonly pageSizeOptions = [10, 20, 30, 50];
  readonly pageSize = 50;
  readonly ColHeaderTypeEnum = ColHeaderTypeEnum;
  readonly columns = COLUMNS;
  searchString: string;

  public appMainState: AppMainState;
  public id: number;
  public dateTimeFormat: string = AidGlobalConfig.dateTimeFormat;

  private dirtyFlag: boolean;

  private noteSubscription: Subscription;

  constructor(private router: Router,
    private logger: AidLoggerService,
    private dialogService: AidDialogService,
    private aidMessageIndicatorService: AidMessageIndicatorService,
    private employeeNoteService: EmployeeNoteService,
    private dialogRef: MatDialogRef<EmployeeNoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.logger.info('EmployeeNoteComponent > constructor');

    this.subscribeEmployeeNoteService();

    this.logger.info('id: ' + this.id);
    this.logger.info('url: ' + this.router.url);

    this.columnsToShow = COLUMNS_AS_ARRAY.map(col => col.field);
    this.dataSource = new LocalDataTableDataSource<EmployeeNote>(COLUMNS_AS_ARRAY);
  }

  ngOnInit() {
    this.appMainState = this.data.appMainState;
    this.id = this.data.appMainState.sellerConractId;
    this.buildForm();
    //this.dataSource.requestSort({column: COLUMNS.noteInfoId.field, state: SortStateEnum.ASC});
    this.dialogService.showProgress();

    this.employeeNoteService.getEmployeeNoteList(this.id);
  }

  ngOnDestroy() {
    if (this.noteSubscription) this.noteSubscription.unsubscribe();
  }

  private buildForm() {
    this.noteInfoCtrl = new FormControl('', [Validators.required]);
  }


  private subscribeEmployeeNoteService() {
    this.noteSubscription = this.employeeNoteService.employeeNoteServiceCallback.subscribe(response => {
      this.logger.info('EmployeeNoteComponent > subscribeEmployeeNoteService');
      this.employeeNoteList = response;
      this.logger.info(this.employeeNoteList);
      if (this.preSelectedPicklistFilter) {
        this.dataSource.requestFilter(this.preSelectedPicklistFilter);
      }
      this.dataSource.setData(this.employeeNoteList);
      this.dialogService.hideProgress();
    });
  }

  clearInputsForNewNote() {
    this.employeeNote.noteInfo = '';
  }

  addNote() {
    if (this.isValidNote()) {
      this.dirtyFlag = true;
      this.dialogService.showProgress();
      this.employeeNoteService.addEmployeeNote(this.id, this.employeeNote)
          .subscribe(response => {
            this.employeeNoteService.getEmployeeNoteList(this.id);
            this.dialogService.hideProgress();
            this.reloadSellerCcontract();
            this.clearInputsForNewNote();
          });
      this.cancelNote();
    }
  }

  cancelNote() {
    this.isAddNoteEnabled = false;
  }

  enableAddNote() {
    this.isAddNoteEnabled = true;
    setTimeout(() => this.noteInput.nativeElement.focus(), 0);
  }

  onClose() {
    this.dialogRef.close(this.dirtyFlag);
  }

  reloadSellerCcontract() {
    const param: AidIndicatorParams = { type: EmployeeActionType.employeeReload.toString(), data: { id: this.id } };
    this.aidMessageIndicatorService.announce(param);
  }

  private isValidNote(): boolean {
    return this.employeeNote && this.employeeNote.noteInfo && this.employeeNote.noteInfo.length > 0;
  }

  public isReadable() {
    return this.appMainState.isAllowed(AppMainPermissionType.canViewEmployee);
  }

  public isWritable() {
    return this.appMainState.isAllowed(AppMainPermissionType.canManageEmployee);
  }
}
