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
    selector: 'aid-content-data-release-order',
    templateUrl: './content-data-release-order.component.html',
    styleUrls: ['./content-data-release-order.component.scss']
})
export class ContentDataReleaseOrderComponent implements OnInit, OnChanges {
  @Input() id: string;
  @Input() contentDataType: ContentDataType;
  @Input() appMainState: AppMainState;

  ContentDataItemDto = ContentDataItemDto;
  dateFormatPipe = new AidDateFormatPipe();

  isNew: boolean;
  dialogLabel: string;
  farmList: ContentDataItemDto[];
  employeeList: ContentDataItemDto[];
  productionManagers: ContentDataItemDto[];
  accountingManagers: ContentDataItemDto[];

  registerForm: FormGroup;
  submitted = false;

  constructor(private dialogRef: MatDialogRef<ContentDataReleaseOrderComponent>,
              private logger: AidLoggerService,
              private dialogService: AidDialogService,
              @Inject(MAT_DIALOG_DATA) readonly data: ContentDataBundle,
              private formBuilder: FormBuilder,
              readonly contentDataService: ContentDataService) {
    this.data = data;
    if (this.data.contentDataItemDto) {
      this.isNew = false;
      this.dialogLabel = 'Edit ReleaseOrder';
    } else {
      this.isNew = true;
      this.dialogLabel = 'Add a new ReleaseOrder';
    }
    this.logger.info('ContentDataReleaseOrderComponent data', this.data);
  }

  ngOnInit() {
    const apiList: ContentDataType[] = [
      ContentDataType.Farm,
      ContentDataType.Employee
    ]
    this.contentDataService.fetchMultipleContentDataList(apiList).subscribe(results => {
      this.farmList = results[0];
      this.employeeList = results[1];
      this.productionManagers = this.employeeList.filter(employee => employee.roleId === 5);
      this.accountingManagers = this.employeeList.filter(employee => employee.roleId === 7);
    });

    this.registerForm = this.formBuilder.group({
        accountingManager: ['', Validators.required],
        farm: ['', Validators.required],
        productionManager: ['', Validators.required],
        shippingDateTime: [''],
        truckLicensePlate: ['']
    });
    this.setFormControls();
  }

  setFormControls() {
    if (!this.isNew) {
      this.registerForm.controls.accountingManager.setValue(this.data.contentDataItemDto.accountingManagerId);
      this.registerForm.controls.farm.setValue(this.data.contentDataItemDto.farmId);
      this.registerForm.controls.productionManager.setValue(this.data.contentDataItemDto.productionManagerId);
      this.registerForm.controls.shippingDateTime.setValue(convertDateStringToDate(this.data.contentDataItemDto.shippingDateTime));
      this.registerForm.controls.truckLicensePlate.setValue(this.data.contentDataItemDto.truckLicensePlate);
    }
  }

  updateContentDataItemDto() {
    if (this.isNew) {
      this.data.contentDataItemDto = new ContentDataItemDto();
    }

    this.data.contentDataItemDto.accountingManagerId = this.registerForm.controls.accountingManager.value;
    this.data.contentDataItemDto.farmId = this.registerForm.controls.farm.value;
    this.data.contentDataItemDto.productionManagerId = this.registerForm.controls.productionManager.value;
    this.data.contentDataItemDto.shippingDateTime = this.registerForm.controls.shippingDateTime.value;
    this.data.contentDataItemDto.truckLicensePlate = this.registerForm.controls.truckLicensePlate.value;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.logger.info('ContentDataReleaseOrderComponent data', this.data);
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
      this.contentDataService.submitContentData(this.isNew, ContentDataType.ReleaseOrder, this.data.contentDataItemDto)
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
          this.contentDataService.deleteContentData(ContentDataType.ReleaseOrder, this.data.contentDataItemDto)
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
