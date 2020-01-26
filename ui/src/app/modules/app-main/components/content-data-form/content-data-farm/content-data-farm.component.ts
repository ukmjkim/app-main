import { Component, Inject, Input, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AidGlobalConfig, AidDialogService, AidLoggerService, AidDateFormatPipe, AidMessageIndicatorService, AidIndicatorParams, AidUrlUtil } from '@ukmjkim/aid-lib-services';
import { AppMainState } from '../../../models/app-main-state';
import { appMessage } from '../../../shared/app.message';
import { ContentDataType } from '../../../models/content-data-type.enum';
import { ContentDataBundle } from '../../../models/content-data-bundle';
import { ContentDataItemDto } from '../../../models/content-data-item-dto';
import { ContentDataService } from '../../../services/content-data.service';

@Component({
    selector: 'aid-content-data-farm',
    templateUrl: './content-data-farm.component.html',
    styleUrls: ['./content-data-farm.component.scss']
})
export class ContentDataFarmComponent implements OnInit, OnChanges {
  @Input() id: string;
  @Input() contentDataType: ContentDataType;
  @Input() appMainState: AppMainState;

  ContentDataItemDto = ContentDataItemDto;
  dateFormatPipe = new AidDateFormatPipe();

  isNew: boolean;
  dialogLabel: string;
  customerList: ContentDataItemDto[];

  registerForm: FormGroup;
  submitted = false;

  constructor(private dialogRef: MatDialogRef<ContentDataFarmComponent>,
              private logger: AidLoggerService,
              private dialogService: AidDialogService,
              @Inject(MAT_DIALOG_DATA) readonly data: ContentDataBundle,
              private formBuilder: FormBuilder,
              readonly contentDataService: ContentDataService) {
    this.data = data;
    if (this.data.contentDataItemDto) {
      this.isNew = false;
      this.dialogLabel = 'Edit Farm';
    } else {
      this.isNew = true;
      this.dialogLabel = 'Add a new Farm';
    }
    this.logger.info('ContentDataFarmComponent data', this.data);
  }

  ngOnInit() {
    const apiList: ContentDataType[] = [
      //ContentDataType.Customer
    ]
    this.contentDataService.fetchMultipleContentDataList(apiList).subscribe(results => {
      this.customerList = results[0];
    });

    this.registerForm = this.formBuilder.group({
        accountNumber: ['', Validators.required],
        //contact: ['', Validators.required],
        farmName: ['', Validators.required],
        odaLicenseNumber: ['', Validators.required]
    });
    this.setFormControls();
  }

  setFormControls() {
    if (!this.isNew) {
      this.registerForm.controls.accountNumber.setValue(this.data.contentDataItemDto.accountNumber);
      //this.registerForm.controls.contact.setValue(this.data.contentDataItemDto.contactId);
      this.registerForm.controls.farmName.setValue(this.data.contentDataItemDto.farmName);
      this.registerForm.controls.odaLicenseNumber.setValue(this.data.contentDataItemDto.odaLicenseNumber);
    }
  }

  updateContentDataItemDto() {
    if (this.isNew) {
      this.data.contentDataItemDto = new ContentDataItemDto();
    }

    this.data.contentDataItemDto.accountNumber = this.registerForm.controls.accountNumber.value;
    //this.data.contentDataItemDto.contactId = this.registerForm.controls.contact.value;
    this.data.contentDataItemDto.farmName = this.registerForm.controls.farmName.value;
    this.data.contentDataItemDto.odaLicenseNumber = this.registerForm.controls.odaLicenseNumber.value;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.logger.info('ContentDataFarmComponent data', this.data);
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
      this.contentDataService.submitContentData(this.isNew, ContentDataType.Farm, this.data.contentDataItemDto)
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
          this.contentDataService.deleteContentData(ContentDataType.Farm, this.data.contentDataItemDto)
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
