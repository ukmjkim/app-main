import { Component, ViewEncapsulation, Inject, Input, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AidGlobalConfig, AidDialogService, AidLoggerService, AidDateFormatPipe, AidMessageIndicatorService, AidIndicatorParams, AidUrlUtil } from '@ukmjkim/aid-lib-services';
import { AppMainState } from '../../../models/app-main-state';
import { appMessage } from '../../../shared/app.message';
import { convertDateStringToDate } from '../../../shared/utils/date-util';
import { ContentDataType } from '../../../models/content-data-type.enum';
import { ContentDataBundle } from '../../../models/content-data-bundle';
import { ContentDataItemDto } from '../../../models/content-data-item-dto';
import { ContentDataService } from '../../../services/content-data.service';

@Component({
    selector: 'aid-content-data-dryer-log',
    templateUrl: './content-data-dryer-log.component.html',
    styleUrls: ['./content-data-dryer-log.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ContentDataDryerLogComponent implements OnInit, OnChanges {
  @Input() id: string;
  @Input() contentDataType: ContentDataType;
  @Input() appMainState: AppMainState;

  ContentDataItemDto = ContentDataItemDto;
  dateFormatPipe = new AidDateFormatPipe();

  isNew: boolean;
  dialogLabel: string;
  dryerList: ContentDataItemDto[];
  workShiftList: ContentDataItemDto[];

  registerForm: FormGroup;
  submitted = false;

  constructor(private dialogRef: MatDialogRef<ContentDataDryerLogComponent>,
              private logger: AidLoggerService,
              private dialogService: AidDialogService,
              @Inject(MAT_DIALOG_DATA) readonly data: ContentDataBundle,
              private formBuilder: FormBuilder,
              readonly contentDataService: ContentDataService) {
    this.data = data;
    if (this.data.contentDataItemDto) {
      this.isNew = false;
      this.dialogLabel = 'Edit Dryer Log';
    } else {
      this.isNew = true;
      this.dialogLabel = 'Add a new Dryer Log';
    }
    this.logger.info('ContentDataDryerLogComponent data', this.data);
  }

  ngOnInit() {
    const apiList: ContentDataType[] = [
      ContentDataType.Dryer,
      ContentDataType.WorkShift
    ]
    this.contentDataService.fetchMultipleContentDataList(apiList).subscribe(results => {
      this.dryerList = results[0];
      this.workShiftList = results[1];
    });

    this.registerForm = this.formBuilder.group({
      action: ['', Validators.required],
      downtimeEndDateTime: [this.data.contentDataItemDto ? convertDateStringToDate(this.data.contentDataItemDto.downtimeEndDateTime) : convertDateStringToDate(null), Validators.required],
      downtimeStartDateTime: [this.data.contentDataItemDto ? convertDateStringToDate(this.data.contentDataItemDto.downtimeStartDateTime) : convertDateStringToDate(null), Validators.required],
      dryer: ['', Validators.required],
      reason: ['', Validators.required],
      workShift: ['', Validators.required]
    });
    this.setFormControls();
  }

  setFormControls() {
    if (!this.isNew) {
      this.registerForm.controls.action.setValue(this.data.contentDataItemDto.action);
      this.registerForm.controls.downtimeEndDateTime.setValue(convertDateStringToDate(this.data.contentDataItemDto.downtimeEndDateTime));
      this.registerForm.controls.downtimeStartDateTime.setValue(convertDateStringToDate(this.data.contentDataItemDto.downtimeStartDateTime));
      this.registerForm.controls.dryer.setValue(this.data.contentDataItemDto.dryerId);
      this.registerForm.controls.reason.setValue(this.data.contentDataItemDto.reason);
      this.registerForm.controls.workShift.setValue(this.data.contentDataItemDto.workShiftId);
    }
  }

  updateContentDataItemDto() {
    if (this.isNew) {
      this.data.contentDataItemDto = new ContentDataItemDto();
    }

    this.data.contentDataItemDto.action = this.registerForm.controls.action.value;
    this.data.contentDataItemDto.downtimeEndDateTime = this.registerForm.controls.downtimeEndDateTime.value;
    this.data.contentDataItemDto.downtimeStartDateTime = this.registerForm.controls.downtimeStartDateTime.value;
    this.data.contentDataItemDto.dryerId = this.registerForm.controls.dryer.value;
    this.data.contentDataItemDto.reason = this.registerForm.controls.reason.value;
    this.data.contentDataItemDto.workShiftId = this.registerForm.controls.workShift.value;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.logger.info('ContentDataDryerLogComponent data', this.data);
    }
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;

      if (this.registerForm.invalid) {
          return;
      }

      this.updateContentDataItemDto();

      this.dialogService.showProgress();
      this.contentDataService.submitContentData(this.isNew, ContentDataType.DryerLog, this.data.contentDataItemDto)
        .subscribe(
          data => {
            this.dialogService.showMessage('Successfully saved!');
            this.dialogService.hideProgress();
            this.dialogRef.close(true);
          },
          err => {
            this.dialogService.showMessage('Failed to save');
            this.dialogService.hideProgress();
          }
        );
  }

  onDelete() {
    if (!(this.data.contentDataItemDto && this.data.contentDataItemDto.id)) {
      return;
    }

    const confirmationMessage = JSON.parse(JSON.stringify(appMessage.confirmDeletion));
    this.dialogService.showMessageDialog(confirmationMessage)
      .afterClosed()
      .subscribe(result => {
        if (result === 'OK') {
          this.contentDataService.deleteContentData(ContentDataType.DryerLog, this.data.contentDataItemDto)
            .subscribe(
              item => {
                this.dialogService.showMessage('Successfully deleted!');
                this.dialogRef.close(true);
              },
              err => {
                this.dialogService.showMessage('Failed to delete');
              }
            );
        }
      });
  }

  onReset() {
      this.submitted = false;
      this.registerForm.reset();
  }

  onClose() {
    this.dialogRef.close(false);
  }
}
