import { Component, Inject, Input, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
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
    selector: 'aid-content-data-work-shift',
    templateUrl: './content-data-work-shift.component.html',
    styleUrls: ['./content-data-work-shift.component.scss']
})
export class ContentDataWorkShiftComponent implements OnInit, OnChanges {
  @Input() id: string;
  @Input() contentDataType: ContentDataType;
  @Input() appMainState: AppMainState;

  ContentDataItemDto = ContentDataItemDto;
  dateFormatPipe = new AidDateFormatPipe();

  isNew: boolean;
  dialogLabel: string;
  employeeList: ContentDataItemDto[];
  dryShopManagers: ContentDataItemDto[];
  productionSupervisors: ContentDataItemDto[];

  registerForm: FormGroup;
  submitted = false;

  constructor(private dialogRef: MatDialogRef<ContentDataWorkShiftComponent>,
              private datePipe: DatePipe,
              private logger: AidLoggerService,
              private dialogService: AidDialogService,
              @Inject(MAT_DIALOG_DATA) readonly data: ContentDataBundle,
              private formBuilder: FormBuilder,
              readonly contentDataService: ContentDataService) {
    this.data = data;
    if (this.data.contentDataItemDto) {
      this.isNew = false;
      this.dialogLabel = 'Edit Work Shift';
    } else {
      this.isNew = true;
      this.dialogLabel = 'Add a new Work Shift';
    }
    this.logger.info('ContentDataWorkShiftComponent data', this.data);
  }

  ngOnInit() {
    const apiList: ContentDataType[] = [
      ContentDataType.Employee
    ]
    this.contentDataService.fetchMultipleContentDataList(apiList).subscribe(results => {
      this.employeeList = results[0];
      this.dryShopManagers = this.employeeList.filter(employee => employee.roleId === 5);
      this.productionSupervisors = this.employeeList.filter(employee => employee.roleId === 6);
    });

    this.registerForm = this.formBuilder.group({
        productionSupervisor: ['', Validators.required],
        dryshopManager: ['', Validators.required],
        workDate: ['', Validators.required],
        shiftName: ['', Validators.required]
    });
    this.setFormControls();
  }

  setFormControls() {
    if (!this.isNew) {
      this.registerForm.controls.productionSupervisor.setValue(this.data.contentDataItemDto.productionSupervisorId);
      this.registerForm.controls.dryshopManager.setValue(this.data.contentDataItemDto.dryshopManagerId);
      this.registerForm.controls.workDate.setValue(this.data.contentDataItemDto.workDate);
      this.registerForm.controls.shiftName.setValue(this.data.contentDataItemDto.shiftName);
    } else {
      this.registerForm.controls.workDate.setValue(this.datePipe.transform(new Date(), 'yyyy-MM-dd'));
    }
  }

  updateContentDataItemDto() {
    if (this.isNew) {
      this.data.contentDataItemDto = new ContentDataItemDto();
    }

    this.data.contentDataItemDto.productionSupervisorId = this.registerForm.controls.productionSupervisor.value;
    this.data.contentDataItemDto.dryshopManagerId = this.registerForm.controls.dryshopManager.value;
    this.data.contentDataItemDto.workDate = this.registerForm.controls.workDate.value;
    this.data.contentDataItemDto.shiftName = this.registerForm.controls.shiftName.value;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.logger.info('ContentDataWorkShiftComponent data', this.data);
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
      this.contentDataService.submitContentData(this.isNew, ContentDataType.WorkShift, this.data.contentDataItemDto)
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
          this.contentDataService.deleteContentData(ContentDataType.WorkShift, this.data.contentDataItemDto)
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
