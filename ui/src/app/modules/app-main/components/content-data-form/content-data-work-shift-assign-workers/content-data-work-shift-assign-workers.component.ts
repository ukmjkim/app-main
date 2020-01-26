import { Component, ViewEncapsulation, Inject, Input, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AidGlobalConfig, AidDialogService, AidLoggerService, AidDateFormatPipe, AidMessageIndicatorService, AidIndicatorParams, AidUrlUtil } from '@ukmjkim/aid-lib-services';
import { AppMainState } from '../../../models/app-main-state';
import { appMessage } from '../../../shared/app.message';
import { ContentDataType } from '../../../models/content-data-type.enum';
import { ContentDataBundle } from '../../../models/content-data-bundle';
import { ContentDataItemDto } from '../../../models/content-data-item-dto';
import { ContentDataService } from '../../../services/content-data.service';

@Component({
    selector: 'aid-content-data-work-shift-assign-workers',
    templateUrl: './content-data-work-shift-assign-workers.component.html',
    styleUrls: ['./content-data-work-shift-assign-workers.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ContentDataWorkShiftAssignWorkersComponent implements OnInit, OnChanges {
  @Input() id: string;
  @Input() contentDataType: ContentDataType;
  @Input() appMainState: AppMainState;

  ContentDataItemDto = ContentDataItemDto;
  dateFormatPipe = new AidDateFormatPipe();

  isNew: boolean;
  dialogLabel: string;
  employeeList: ContentDataItemDto[];
  workHourList: ContentDataItemDto[];

  workers = new FormControl();
  workedHours: number;
  selectedWorkers: {id: number, selected: boolean}[] = [];
  registerForm: FormGroup;
  submitted = false;

  constructor(private dialogRef: MatDialogRef<ContentDataWorkShiftAssignWorkersComponent>,
              private datePipe: DatePipe,
              private logger: AidLoggerService,
              private dialogService: AidDialogService,
              @Inject(MAT_DIALOG_DATA) readonly data: ContentDataBundle,
              private formBuilder: FormBuilder,
              readonly contentDataService: ContentDataService) {
    this.data = data;
    this.logger.info('ContentDataWorkShiftAssignWorkersComponent data', this.data);
  }

  ngOnInit() {
    const apiList: ContentDataType[] = [
      ContentDataType.Employee
    ];

    this.contentDataService.fetchMultipleContentDataList(apiList).subscribe(results => {
      this.employeeList = results[0];
    });

    this.registerForm = this.formBuilder.group({
        workedHours: ['', [Validators.required, Validators.pattern(/^[.\d]+$/)]]
    });
    this.setFormControls();
    this.reloadWorkHours();
  }

  setFormControls() {

  }

  reloadWorkHours() {
    const apiList: ContentDataType[] = [
      ContentDataType.WorkHour
    ];

    this.contentDataService.fetchMultipleContentDataList(apiList).subscribe(results => {
      this.workHourList = results[0].filter(workHour => workHour.workShiftId === this.data.contentDataItemDto.id);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.logger.info('ContentDataWorkShiftAssignWorkersComponent data', this.data);
    }
  }

  get f() { return this.registerForm.controls; }

  assignWorker(matOption) {
    const filtered = this.selectedWorkers.filter(selectedWorker => selectedWorker.id === matOption.source.value);
    if (filtered && filtered.length > 0) {
      filtered[0].selected = matOption.source.selected;
      this.selectedWorkers.forEach((item, index) => {
        if (item.id === matOption.source.value) {
          this.selectedWorkers.splice(index, 1);
        }
      });
    } else {
      if (matOption.source.selected) {
        this.selectedWorkers.push({id: matOption.source.value.id, selected: matOption.source.selected});
      }
    }

    this.logger.info('assignWorker this.selectedWorkers', this.selectedWorkers);
    this.logger.info('assignWorker this.workers', this.workers.value);
  }

  onAddWorkHours() {
      this.submitted = true;

      if (this.registerForm.invalid) {
          return;
      }

      if (this.workers && this.workers.value && this.workers.value.length < 1) {
        return;
      }

      this.selectedWorkers = [];
      this.workers.value.forEach(worker => {
        this.selectedWorkers.push({id: worker.id, selected: true});
      });


      this.dialogService.showProgress();

      const numberOfWork = this.selectedWorkers.length;
      let completed = 0;
      this.selectedWorkers.forEach(worker => {
        const contentDataItemDto = new ContentDataItemDto();
        contentDataItemDto.employeeId = worker.id;
        contentDataItemDto.workShiftId = this.data.contentDataItemDto.id;
        contentDataItemDto.workedHours = +this.registerForm.controls.workedHours.value;

        this.logger.info('onAddWorkHours contentDataItemDto', contentDataItemDto);
        this.contentDataService.submitContentData(true, ContentDataType.WorkHour, contentDataItemDto)
        .subscribe(
          workHour => {
            completed += 1;
            if (completed >= numberOfWork) {
              this.dialogService.showMessage('Successfully saved!');
              this.dialogService.hideProgress();
              this.reloadWorkHours();
            }
          },
          err => {
            this.dialogService.showMessage('Failed to save');
            this.dialogService.hideProgress();
            this.reloadWorkHours();
          }
        );
      });
  }

  onDeleteWorkHours(workHourId: number) {
    const contentDataItemDto = new ContentDataItemDto();
    contentDataItemDto.id = workHourId;
    const confirmationMessage = JSON.parse(JSON.stringify(appMessage.confirmDeletionWorkHourFromWorkShift));
    this.dialogService.showMessageDialog(confirmationMessage)
      .afterClosed()
      .subscribe(result => {
        if (result === 'OK') {
          this.contentDataService.deleteContentData(ContentDataType.WorkHour, contentDataItemDto)
            .subscribe(
              item => {
                this.dialogService.showMessage('Successfully deleted!');
                this.reloadWorkHours();
              },
              err => {
                this.dialogService.showMessage('Failed to delete');
              }
            );
        }
      });
  }

  onClose() {
    this.dialogRef.close(false);
  }
}
