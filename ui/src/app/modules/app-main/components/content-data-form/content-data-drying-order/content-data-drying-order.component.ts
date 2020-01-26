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
    selector: 'aid-content-data-drying-order',
    templateUrl: './content-data-drying-order.component.html',
    styleUrls: ['./content-data-drying-order.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ContentDataDryingOrderComponent implements OnInit, OnChanges {
  @Input() id: string;
  @Input() contentDataType: ContentDataType;
  @Input() appMainState: AppMainState;

  ContentDataItemDto = ContentDataItemDto;
  dateFormatPipe = new AidDateFormatPipe();

  isNew: boolean;
  dialogLabel: string;
  farmList: ContentDataItemDto[];
  employeeList: ContentDataItemDto[];
  salesManagers: ContentDataItemDto[];

  registerForm: FormGroup;
  submitted = false;

  constructor(private dialogRef: MatDialogRef<ContentDataDryingOrderComponent>,
              private logger: AidLoggerService,
              private dialogService: AidDialogService,
              @Inject(MAT_DIALOG_DATA) readonly data: ContentDataBundle,
              private formBuilder: FormBuilder,
              readonly contentDataService: ContentDataService) {
    this.data = data;
    if (this.data.contentDataItemDto) {
      this.isNew = false;
      this.dialogLabel = 'Edit Drying Order';
    } else {
      this.isNew = true;
      this.dialogLabel = 'Add a new Drying Order';
    }
    this.logger.info('ContentDataDryingOrderComponent data', this.data);
  }

  ngOnInit() {
    const apiList: ContentDataType[] = [
      ContentDataType.Farm,
      ContentDataType.Employee
    ]
    this.contentDataService.fetchMultipleContentDataList(apiList).subscribe(results => {
      this.farmList = results[0];
      this.employeeList = results[1];
      this.salesManagers = this.employeeList.filter(employee => employee.roleId === 2 /*Sales Manager*/);
    });

    this.registerForm = this.formBuilder.group({
        acres: ['', [Validators.required, Validators.pattern(/^[.\d]+$/)]],
        desiredMoisture: ['', [Validators.required, Validators.pattern(/^[.\d]+$/)]],
        dropoffDateTime: [this.data.contentDataItemDto ? convertDateStringToDate(this.data.contentDataItemDto.dropoffDateTime) : convertDateStringToDate(null), Validators.required],
        farm: ['', Validators.required],
        isChopNeeded: [false, Validators.required],
        saleManager: ['', Validators.required]
    });
    this.setFormControls();
  }

  setFormControls() {
    if (!this.isNew) {
      this.registerForm.controls.acres.setValue(this.data.contentDataItemDto.acres);
      this.registerForm.controls.desiredMoisture.setValue(this.data.contentDataItemDto.desiredMoisture);
      this.registerForm.controls.dropoffDateTime.setValue(convertDateStringToDate(this.data.contentDataItemDto.dropoffDateTime));
      this.registerForm.controls.farm.setValue(this.data.contentDataItemDto.farmId);
      this.registerForm.controls.isChopNeeded.setValue(this.data.contentDataItemDto.isChopNeeded);
      this.registerForm.controls.saleManager.setValue(this.data.contentDataItemDto.saleManagerId);
    }
  }

  updateContentDataItemDto() {
    if (this.isNew) {
      this.data.contentDataItemDto = new ContentDataItemDto();
    }

    this.data.contentDataItemDto.acres = this.registerForm.controls.acres.value;
    this.data.contentDataItemDto.desiredMoisture = this.registerForm.controls.desiredMoisture.value;
    this.data.contentDataItemDto.dropoffDateTime = this.registerForm.controls.dropoffDateTime.value;
    this.data.contentDataItemDto.farmId = this.registerForm.controls.farm.value;
    this.data.contentDataItemDto.isChopNeeded = this.registerForm.controls.isChopNeeded.value;
    this.data.contentDataItemDto.saleManagerId = this.registerForm.controls.saleManager.value;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.logger.info('ContentDataDryingOrderComponent data', this.data);
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
      this.contentDataService.submitContentData(this.isNew, ContentDataType.DryingOrder, this.data.contentDataItemDto)
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
          this.contentDataService.deleteContentData(ContentDataType.DryingOrder, this.data.contentDataItemDto)
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
