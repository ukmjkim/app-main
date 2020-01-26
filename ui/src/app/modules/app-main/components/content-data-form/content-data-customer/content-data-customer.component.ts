import { Component, ViewEncapsulation, Inject, Input, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
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
    selector: 'aid-content-data-customer',
    templateUrl: './content-data-customer.component.html',
    styleUrls: ['./content-data-customer.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ContentDataCustomerComponent implements OnInit, OnChanges {
  @Input() id: string;
  @Input() contentDataType: ContentDataType;
  @Input() appMainState: AppMainState;

  ContentDataItemDto = ContentDataItemDto;
  dateFormatPipe = new AidDateFormatPipe();

  isNew: boolean;
  dialogLabel: string;

  registerForm: FormGroup;
  submitted = false;
  farmList: ContentDataItemDto[];

  constructor(private dialogRef: MatDialogRef<ContentDataCustomerComponent>,
              private logger: AidLoggerService,
              private dialogService: AidDialogService,
              @Inject(MAT_DIALOG_DATA) readonly data: ContentDataBundle,
              private formBuilder: FormBuilder,
              readonly contentDataService: ContentDataService) {
    this.data = data;
    if (this.data.contentDataItemDto) {
      this.isNew = false;
      this.dialogLabel = 'Edit Contact';
    } else {
      this.isNew = true;
      this.dialogLabel = 'Add a new Contact';
    }
    this.logger.info('ContentDataCustomerComponent data', this.data);
  }

  ngOnInit() {
    const apiList: ContentDataType[] = [
      ContentDataType.Farm
    ];

    this.contentDataService.fetchMultipleContentDataList(apiList).subscribe(results => {
      this.farmList = results[0];
    });

    this.registerForm = this.formBuilder.group({
      email: ['', Validators.email],
      firstName: ['', Validators.required],
      homePhone: [''],
      lastName: ['', Validators.required],
      mobilePhone: [''],
      officePhone: ['', Validators.required],
      farm: ['', Validators.required]
    });
    this.setFormControls();
  }

  setFormControls() {
    if (!this.isNew) {
      this.registerForm.controls.email.setValue(this.data.contentDataItemDto.email);
      this.registerForm.controls.firstName.setValue(this.data.contentDataItemDto.firstName);
      this.registerForm.controls.homePhone.setValue(this.data.contentDataItemDto.homePhone);
      this.registerForm.controls.lastName.setValue(this.data.contentDataItemDto.lastName);
      this.registerForm.controls.mobilePhone.setValue(this.data.contentDataItemDto.mobilePhone);
      this.registerForm.controls.officePhone.setValue(this.data.contentDataItemDto.officePhone);
      this.registerForm.controls.farm.setValue(this.data.contentDataItemDto.farmId);
    }
  }

  updateContentDataItemDto() {
    if (this.isNew) {
      this.data.contentDataItemDto = new ContentDataItemDto();
    }

    this.data.contentDataItemDto.email = this.registerForm.controls.email.value;
    this.data.contentDataItemDto.firstName = this.registerForm.controls.firstName.value;
    this.data.contentDataItemDto.homePhone = this.registerForm.controls.homePhone.value;
    this.data.contentDataItemDto.lastName = this.registerForm.controls.lastName.value;
    this.data.contentDataItemDto.mobilePhone = this.registerForm.controls.mobilePhone.value;
    this.data.contentDataItemDto.officePhone = this.registerForm.controls.officePhone.value;
    this.data.contentDataItemDto.farmId = this.registerForm.controls.farm.value;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.logger.info('ContentDataCustomerComponent data', this.data);
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
      this.contentDataService.submitContentData(this.isNew, ContentDataType.Contact, this.data.contentDataItemDto)
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
          this.contentDataService.deleteContentData(ContentDataType.Contact, this.data.contentDataItemDto)
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
