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
    selector: 'aid-content-data-employee',
    templateUrl: './content-data-employee.component.html',
    styleUrls: ['./content-data-employee.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ContentDataEmployeeComponent implements OnInit, OnChanges {
  @Input() id: string;
  @Input() contentDataType: ContentDataType;
  @Input() appMainState: AppMainState;

  ContentDataItemDto = ContentDataItemDto;
  dateFormatPipe = new AidDateFormatPipe();

  isNew: boolean;
  dialogLabel: string;
  roleList: ContentDataItemDto[];

  registerForm: FormGroup;
  submitted = false;

  constructor(private dialogRef: MatDialogRef<ContentDataEmployeeComponent>,
              private logger: AidLoggerService,
              private dialogService: AidDialogService,
              @Inject(MAT_DIALOG_DATA) readonly data: ContentDataBundle,
              private formBuilder: FormBuilder,
              readonly contentDataService: ContentDataService) {
    this.data = data;
    if (this.data.contentDataItemDto) {
      this.isNew = false;
      this.dialogLabel = 'Edit Employee';
    } else {
      this.isNew = true;
      this.dialogLabel = 'Add a new Employee';
    }
    this.logger.info('ContentDataEmployeeComponent data', this.data);
  }

  ngOnInit() {
    const apiList: ContentDataType[] = [
      ContentDataType.Role
    ]
    this.contentDataService.fetchMultipleContentDataList(apiList).subscribe(results => {
      this.roleList = results[0];
    });

    if (this.isNew) {
      this.registerForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        isActive: ['', Validators.required],
        lastName: ['', Validators.required],
        loginName: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        phone: ['', Validators.required],
        role: ['', Validators.required]
      });
    } else {
      this.registerForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        isActive: ['', Validators.required],
        lastName: ['', Validators.required],
        phone: ['', Validators.required],
        role: ['', Validators.required]
      });
    }
    this.setFormControls();
  }

  // this.registerForm = this.formBuilder.group({
  //   firstName: ['', Validators.required],
  //   isActive: ['', Validators.required],
  //   lastName: ['', Validators.required],
  //   loginName: ['', Validators.required],
  //   password: ['', [Validators.required, Validators.minLength(6)]],
  //   confirmPassword: ['', Validators.required],
  //   phone: ['', Validators.required],
  //   role: ['', Validators.required]
  // }, {
  //   validator: MustMatch('password', 'confirmPassword')
  // });
  // this.setFormControls();

  setFormControls() {
    if (!this.isNew) {
      this.registerForm.controls.firstName.setValue(this.data.contentDataItemDto.firstName);
      this.registerForm.controls.isActive.setValue(this.data.contentDataItemDto.isActive);
      this.registerForm.controls.lastName.setValue(this.data.contentDataItemDto.lastName);
      this.registerForm.controls.phone.setValue(this.data.contentDataItemDto.phone);
      this.registerForm.controls.role.setValue(this.data.contentDataItemDto.roleId);
    } else {
      this.registerForm.controls.isActive.setValue(true);
    }
  }

  updateContentDataItemDto() {
    if (this.isNew) {
      this.data.contentDataItemDto = new ContentDataItemDto();
    }

    this.data.contentDataItemDto.firstName = this.registerForm.controls.firstName.value;
    this.data.contentDataItemDto.isActive = this.registerForm.controls.isActive.value;
    this.data.contentDataItemDto.lastName = this.registerForm.controls.lastName.value;
    if (this.isNew) {
      this.data.contentDataItemDto.loginName = this.registerForm.controls.loginName.value;
      this.data.contentDataItemDto.password = this.registerForm.controls.password.value;
    }
    this.data.contentDataItemDto.phone = this.registerForm.controls.phone.value;
    this.data.contentDataItemDto.roleId = this.registerForm.controls.role.value;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.logger.info('ContentDataEmployeeComponent data', this.data);
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
      this.contentDataService.submitContentData(this.isNew, ContentDataType.Employee, this.data.contentDataItemDto)
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
          this.contentDataService.deleteContentData(ContentDataType.Employee, this.data.contentDataItemDto)
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
