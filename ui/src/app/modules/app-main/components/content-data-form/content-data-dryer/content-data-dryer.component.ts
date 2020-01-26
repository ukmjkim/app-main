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
    selector: 'aid-content-data-dryer',
    templateUrl: './content-data-dryer.component.html',
    styleUrls: ['./content-data-dryer.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ContentDataDryerComponent implements OnInit, OnChanges {
  @Input() id: string;
  @Input() contentDataType: ContentDataType;
  @Input() appMainState: AppMainState;

  ContentDataItemDto = ContentDataItemDto;
  dateFormatPipe = new AidDateFormatPipe();

  isNew: boolean;
  dialogLabel: string;

  registerForm: FormGroup;
  submitted = false;

  constructor(private dialogRef: MatDialogRef<ContentDataDryerComponent>,
              private logger: AidLoggerService,
              private dialogService: AidDialogService,
              @Inject(MAT_DIALOG_DATA) readonly data: ContentDataBundle,
              private formBuilder: FormBuilder,
              readonly contentDataService: ContentDataService) {
    this.data = data;
    if (this.data.contentDataItemDto) {
      this.isNew = false;
      this.dialogLabel = 'Edit Dryer';
    } else {
      this.isNew = true;
      this.dialogLabel = 'Add a new Dryer';
    }
    this.logger.info('ContentDataDryerComponent data', this.data);
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      isActive: [true, Validators.required]
    });
    this.setFormControls();
  }

  setFormControls() {
    console.log('setFormControls isActive', this.data.contentDataItemDto.isActive);
    if (!this.isNew) {
      this.registerForm.controls.name.setValue(this.data.contentDataItemDto.name);
      this.registerForm.controls.isActive.setValue(this.data.contentDataItemDto.isActive);
    } else {
      this.registerForm.controls.isActive.setValue(true);
    }
  }

  updateContentDataItemDto() {
    if (this.isNew) {
      this.data.contentDataItemDto = new ContentDataItemDto();
    }

    this.data.contentDataItemDto.name = this.registerForm.controls.name.value;
    this.data.contentDataItemDto.isActive = this.registerForm.controls.isActive.value;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.logger.info('ContentDataDryerComponent data', this.data);
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
      this.contentDataService.submitContentData(this.isNew, ContentDataType.Dryer, this.data.contentDataItemDto)
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
          this.contentDataService.deleteContentData(ContentDataType.Dryer, this.data.contentDataItemDto)
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
