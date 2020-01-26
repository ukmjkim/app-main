import { Component, Inject, Input, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
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
    selector: 'aid-content-data-testing-coa-log',
    templateUrl: './content-data-testing-coa-log.component.html',
    styleUrls: ['./content-data-testing-coa-log.component.scss']
})
export class ContentDataTestingCOALogComponent implements OnInit, OnChanges {
  @Input() id: string;
  @Input() contentDataType: ContentDataType;
  @Input() appMainState: AppMainState;

  ContentDataItemDto = ContentDataItemDto;
  dateFormatPipe = new AidDateFormatPipe();

  isNew: boolean;
  dialogLabel: string;
  bagList: ContentDataItemDto[];
  employeeList: ContentDataItemDto[];
  labTechnicians: ContentDataItemDto[];
  labSupervisors: ContentDataItemDto[];

  registerForm: FormGroup;
  submitted = false;

  constructor(private dialogRef: MatDialogRef<ContentDataTestingCOALogComponent>,
              private logger: AidLoggerService,
              private dialogService: AidDialogService,
              @Inject(MAT_DIALOG_DATA) readonly data: ContentDataBundle,
              private formBuilder: FormBuilder,
              readonly contentDataService: ContentDataService) {
    this.data = data;
    if (this.data.contentDataItemDto) {
      this.isNew = false;
      this.dialogLabel = 'Edit Testing COA Log';
    } else {
      this.isNew = true;
      this.dialogLabel = 'Add a new Testing COA Log';
    }
    this.logger.info('ContentDataTestingCOALogComponent data', this.data);
  }

  ngOnInit() {
    const apiList: ContentDataType[] = [
      ContentDataType.Bag,
      ContentDataType.Employee
    ]
    this.contentDataService.fetchMultipleContentDataList(apiList).subscribe(results => {
      this.bagList = results[0];
      this.employeeList = results[1];
      this.labTechnicians = this.employeeList.filter(employee => employee.roleId === 4);
      this.labSupervisors = this.employeeList.filter(employee => employee.roleId === 3);
    });

    this.registerForm = this.formBuilder.group({
      id: [''],
      bag: ['', Validators.required],
      dryingTime: ['', [Validators.required, Validators.pattern(/^[.\d]+$/)]],
      isTestPassed: [true, Validators.required],
      labSupervisor: ['', Validators.required],
      labTechnician: ['', Validators.required],
      moisture: ['', [Validators.required, Validators.pattern(/^[.\d]+$/)]],
      note: ['', Validators.required],
      roomMoisture: ['', [Validators.required, Validators.pattern(/^[.\d]+$/)]],
      roomTemperature: ['', [Validators.required, Validators.pattern(/^[.\d]+$/)]],
      sample: ['', Validators.required],
      testDateTime: [this.data.contentDataItemDto ? convertDateStringToDate(this.data.contentDataItemDto.testDateTime) : convertDateStringToDate(null), Validators.required],
      testingTemperature: ['', [Validators.required, Validators.pattern(/^[.\d]+$/)]],
      weightAfterDrying: ['', [Validators.required, Validators.pattern(/^[.\d]+$/)]],
      weightBeforeDrying: ['', [Validators.required, Validators.pattern(/^[.\d]+$/)]]
    });
    this.setFormControls();
  }

  setFormControls() {
    if (!this.isNew) {
      this.registerForm.controls.id.setValue(this.data.contentDataItemDto.id);
      this.registerForm.controls.bag.setValue(this.data.contentDataItemDto.bagId);
      this.registerForm.controls.dryingTime.setValue(this.data.contentDataItemDto.dryingTime);
      this.registerForm.controls.isTestPassed.setValue(this.data.contentDataItemDto.isTestPassed);
      this.registerForm.controls.labSupervisor.setValue(this.data.contentDataItemDto.labSupervisorId);
      this.registerForm.controls.labTechnician.setValue(this.data.contentDataItemDto.labTechnicianId);
      this.registerForm.controls.moisture.setValue(this.data.contentDataItemDto.moisture);
      this.registerForm.controls.note.setValue(this.data.contentDataItemDto.note);
      this.registerForm.controls.roomMoisture.setValue(this.data.contentDataItemDto.roomMoisture);
      this.registerForm.controls.roomTemperature.setValue(this.data.contentDataItemDto.roomTemperature);
      this.registerForm.controls.sample.setValue(this.data.contentDataItemDto.sample);
      this.registerForm.controls.testDateTime.setValue(convertDateStringToDate(this.data.contentDataItemDto.testDateTime));
      this.registerForm.controls.testingTemperature.setValue(this.data.contentDataItemDto.testingTemperature);
      this.registerForm.controls.weightAfterDrying.setValue(this.data.contentDataItemDto.weightAfterDrying);
      this.registerForm.controls.weightBeforeDrying.setValue(this.data.contentDataItemDto.weightBeforeDrying);
    }
  }

  updateContentDataItemDto() {
    if (this.isNew) {
      this.data.contentDataItemDto = new ContentDataItemDto();
    }

    this.data.contentDataItemDto.id = this.registerForm.controls.id.value;
    this.data.contentDataItemDto.bagId = this.registerForm.controls.bag.value;
    this.data.contentDataItemDto.dryingTime = this.registerForm.controls.dryingTime.value;
    this.data.contentDataItemDto.isTestPassed = this.registerForm.controls.isTestPassed.value;
    this.data.contentDataItemDto.labSupervisorId = this.registerForm.controls.labSupervisor.value;
    this.data.contentDataItemDto.labTechnicianId = this.registerForm.controls.labTechnician.value;
    this.data.contentDataItemDto.moisture = this.registerForm.controls.moisture.value;
    this.data.contentDataItemDto.note = this.registerForm.controls.note.value;
    this.data.contentDataItemDto.roomMoisture = this.registerForm.controls.roomMoisture.value;
    this.data.contentDataItemDto.roomTemperature = this.registerForm.controls.roomTemperature.value;
    this.data.contentDataItemDto.sample = this.registerForm.controls.sample.value;
    this.data.contentDataItemDto.testDateTime = this.registerForm.controls.testDateTime.value;
    this.data.contentDataItemDto.testingTemperature = this.registerForm.controls.testingTemperature.value;
    this.data.contentDataItemDto.weightAfterDrying = this.registerForm.controls.weightAfterDrying.value;
    this.data.contentDataItemDto.weightBeforeDrying = this.registerForm.controls.weightBeforeDrying.value;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.logger.info('ContentDataTestingCOALogComponent data', this.data);
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
      this.contentDataService.submitContentData(this.isNew, ContentDataType.TestingCOALog, this.data.contentDataItemDto)
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
          this.contentDataService.deleteContentData(ContentDataType.TestingCOALog, this.data.contentDataItemDto)
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
