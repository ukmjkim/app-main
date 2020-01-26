import { Component, ViewEncapsulation, Inject, Input, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { DatePipe } from '@angular/common';
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
    selector: 'aid-content-data-bag',
    templateUrl: './content-data-bag.component.html',
    styleUrls: ['./content-data-bag.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ContentDataBagComponent implements OnInit, OnChanges {
  @Input() id: string;
  @Input() contentDataType: ContentDataType;
  @Input() appMainState: AppMainState;

  ContentDataItemDto = ContentDataItemDto;
  dateFormatPipe = new AidDateFormatPipe();

  isNew: boolean;
  dialogLabel: string;
  dryingOrderList: ContentDataItemDto[];
  dryerList: ContentDataItemDto[];
  employeeList: ContentDataItemDto[];
  workShiftList: ContentDataItemDto[];
  warehouseHandlers: ContentDataItemDto[];

  registerForm: FormGroup;
  submitted = false;

  constructor(private datePipe: DatePipe,
              private dialogRef: MatDialogRef<ContentDataBagComponent>,
              private logger: AidLoggerService,
              private dialogService: AidDialogService,
              @Inject(MAT_DIALOG_DATA) readonly data: ContentDataBundle,
              private formBuilder: FormBuilder,
              readonly contentDataService: ContentDataService) {
    this.data = data;
    if (this.data.contentDataItemDto) {
      this.isNew = false;
      this.dialogLabel = 'Edit Bag';
    } else {
      this.isNew = true;
      this.dialogLabel = 'Add a new Bag';
    }
    this.logger.info('ContentDataBagComponent data', this.data);
  }

  ngOnInit() {
    const apiList: ContentDataType[] = [
      ContentDataType.DryingOrder,
      ContentDataType.Dryer,
      ContentDataType.Employee,
      ContentDataType.WorkShift
    ];

    this.contentDataService.fetchMultipleContentDataList(apiList).subscribe(results => {
      this.dryingOrderList = results[0];
      this.dryerList = results[1];
      this.employeeList = results[2];
      this.workShiftList = results[3];
      this.warehouseHandlers = this.employeeList.filter(employee => employee.roleId === 11 /*Warehouse Handler*/);
    });

    this.registerForm = this.formBuilder.group({
        name: ['', Validators.required],
        dryingOrder: ['', Validators.required],
        dryingDateTime: [this.data.contentDataItemDto ? convertDateStringToDate(this.data.contentDataItemDto.dryingDateTime) : convertDateStringToDate(null), Validators.required],
        dryer: ['', Validators.required],
        productBreed: ['', Validators.required],
        dryWeight: ['', [Validators.required, Validators.pattern(/^[.\d]+$/)]],
        warehouseHandler: ['', Validators.required],
        workShift: ['', Validators.required],
        storageZone: ['', Validators.required],
        tagColor: ['', Validators.required],
        inWarehouseDateTime: [this.data.contentDataItemDto ? convertDateStringToDate(this.data.contentDataItemDto.inWarehouseDateTime) : convertDateStringToDate(null), Validators.required],
        status: ['', Validators.required]
    });
    this.setFormControls();
  }

  setFormControls() {
    if (!this.isNew) {
      this.registerForm.controls.name.setValue(this.data.contentDataItemDto.name);
      this.registerForm.controls.dryingOrder.setValue(this.data.contentDataItemDto.dryingOrderId);
      this.registerForm.controls.dryingDateTime.setValue(convertDateStringToDate(this.data.contentDataItemDto.dryingDateTime));
      this.registerForm.controls.dryer.setValue(this.data.contentDataItemDto.dryerId);
      this.registerForm.controls.productBreed.setValue(this.data.contentDataItemDto.productBreed);
      this.registerForm.controls.dryWeight.setValue(this.data.contentDataItemDto.dryWeight);
      this.registerForm.controls.warehouseHandler.setValue(this.data.contentDataItemDto.warehouseHandlerId);
      this.registerForm.controls.workShift.setValue(this.data.contentDataItemDto.workShiftId);
      this.registerForm.controls.storageZone.setValue(this.data.contentDataItemDto.storageZone);
      this.registerForm.controls.tagColor.setValue(this.data.contentDataItemDto.tagColor);
      this.registerForm.controls.inWarehouseDateTime.setValue(convertDateStringToDate(this.data.contentDataItemDto.inWarehouseDateTime));
      this.registerForm.controls.status.setValue(this.data.contentDataItemDto.status);
    }
  }

  updateContentDataItemDto() {
    if (this.isNew) {
      this.data.contentDataItemDto = new ContentDataItemDto();
    }

    this.data.contentDataItemDto.name = this.registerForm.controls.name.value;
    this.data.contentDataItemDto.dryingOrderId = this.registerForm.controls.dryingOrder.value;
    this.data.contentDataItemDto.dryingDateTime = this.registerForm.controls.dryingDateTime.value;
    this.data.contentDataItemDto.dryerId = this.registerForm.controls.dryer.value;
    this.data.contentDataItemDto.productBreed = this.registerForm.controls.productBreed.value;
    this.data.contentDataItemDto.dryWeight = this.registerForm.controls.dryWeight.value;
    this.data.contentDataItemDto.warehouseHandlerId = this.registerForm.controls.warehouseHandler.value;
    this.data.contentDataItemDto.workShiftId = this.registerForm.controls.workShift.value;
    this.data.contentDataItemDto.storageZone = this.registerForm.controls.storageZone.value;
    this.data.contentDataItemDto.tagColor = this.registerForm.controls.tagColor.value;
    this.data.contentDataItemDto.inWarehouseDateTime = this.registerForm.controls.inWarehouseDateTime.value;
    this.data.contentDataItemDto.status = this.registerForm.controls.status.value;
  }

  //   ngOnInit() {
  //     this.registerForm = this.formBuilder.group({
  //         customer: ['', Validators.required],
  //         dryingOrder: ['', Validators.required],
  //         dryingDateTime: ['', Validators.required],
  //         dryer: ['', [Validators.required, Validators.email]],
  //         password: ['', [Validators.required, Validators.minLength(6)]],
  //         confirmPassword: ['', Validators.required],
  //         acceptTerms: [false, Validators.requiredTrue]
  //     }, {
  //         validator: MustMatch('password', 'confirmPassword')
  //     });

  //     this.registerForm.controls.firstName.setValue('aa');
  // }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.logger.info('ContentDataBagComponent data', this.data);
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
      this.contentDataService.submitContentData(this.isNew, ContentDataType.Bag, this.data.contentDataItemDto)
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
          this.contentDataService.deleteContentData(ContentDataType.Bag, this.data.contentDataItemDto)
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
