import { Component, Input, OnInit, SimpleChanges, Injector } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { AidGlobalConfig, AidDialogService, AidLoggerService, AidDateFormatPipe, AidMessageIndicatorService, AidIndicatorParams, AidUrlUtil } from '@ukmjkim/aid-lib-services';
import { AppMainPermissionType } from '../../models/app-main-permission-type.enum';
import { AppMainState } from '../../models/app-main-state';
import { appMessage } from '../../shared/app.message';
import { ContentDataType } from '../../models/content-data-type.enum';
import { ContentDataItemDto } from '../../models/content-data-item-dto';
import { ContentDataService } from '../../services/content-data.service';

@Component({
  selector: 'aid-pickup-lot-config',
  templateUrl: './pickup-lot-config.component.html',
  styleUrls: ['./pickup-lot-config.component.scss']
})
export class PickupLotConfigComponent implements OnInit {
  @Input() id: string;
  @Input() contentDataType: ContentDataType;
  @Input() appInjector: Injector;
  @Input() appMainState: AppMainState;
  @Input() pageTitle: string;
  @Input() pageInfo: string;


  ContentDataItemDto = ContentDataItemDto;
  dateFormatPipe = new AidDateFormatPipe();

  contentDataItemDto:ContentDataItemDto = new ContentDataItemDto();
  isNew: boolean;
  dialogLabel: string;
  roleList: ContentDataItemDto[];

  registerForm: FormGroup;
  submitted = false;

  constructor(private logger: AidLoggerService,
    private dialogService: AidDialogService,
    private formBuilder: FormBuilder,
    readonly contentDataService: ContentDataService) {

  }

  ngOnInit() {
    const apiList: ContentDataType[] = [
      ContentDataType.Role
    ]
    // this.contentDataService.fetchMultipleContentDataList(apiList).subscribe(results => {
    //   this.roleList = results[0];
    // });

    if (this.isNew) {
      this.registerForm = this.formBuilder.group({
        site: ['', Validators.required],
        event: ['', Validators.required],
        lotRangeFrom: ['', Validators.required],
        lotRangeTo: ['', Validators.required],
        cucurrentPickups: ['', Validators.required],
        blockAdjacentLots: ['', Validators.required],
        loadingTime: ['', Validators.required]
      });
    } else {
      this.registerForm = this.formBuilder.group({
        site: ['', Validators.required],
        event: ['', Validators.required],
        lotRangeFrom: ['', Validators.required],
        lotRangeTo: ['', Validators.required],
        cucurrentPickups: ['', Validators.required],
        blockAdjacentLots: ['', Validators.required],
        loadingTime: ['', Validators.required]
      });
    }
    this.setFormControls();
  }

  setFormControls() {
    if (!this.isNew) {
      this.registerForm.controls.site.setValue(this.contentDataItemDto.site);
      this.registerForm.controls.event.setValue(this.contentDataItemDto.event);
      this.registerForm.controls.lotRangeFrom.setValue(this.contentDataItemDto.lotRangeFrom);
      this.registerForm.controls.lotRangeTo.setValue(this.contentDataItemDto.lotRangeTo);
      this.registerForm.controls.cucurrentPickups.setValue(this.contentDataItemDto.cucurrentPickups);
      this.registerForm.controls.blockAdjacentLots.setValue(this.contentDataItemDto.blockAdjacentLots);
      this.registerForm.controls.loadingTime.setValue(this.contentDataItemDto.loadingTime);
    } else {
      this.registerForm.controls.isActive.setValue(true);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['appMainState']) {
      this.logger.info("PurchaseOrderComponent ngOnChanges this.appMainState", this.appMainState);
      // if (this.appMainState.eventId === undefined || this.appMainState.eventId === 0) {
      //   this.pickupSearchMethodService.configureSitePurchaseOrderNoNavChange();
      // } else {
      //   this.pickupSearchMethodService.configureEventPurchaseOrderNoNavChange();
      // }
    }
  }

  updateContentDataItemDto() {
    if (this.isNew) {
      this.contentDataItemDto = new ContentDataItemDto();
    }

    this.contentDataItemDto.firstName = this.registerForm.controls.firstName.value;
    this.contentDataItemDto.isActive = this.registerForm.controls.isActive.value;
    this.contentDataItemDto.lastName = this.registerForm.controls.lastName.value;
    if (this.isNew) {
      this.contentDataItemDto.loginName = this.registerForm.controls.loginName.value;
      this.contentDataItemDto.password = this.registerForm.controls.password.value;
    }
    this.contentDataItemDto.phone = this.registerForm.controls.phone.value;
    this.contentDataItemDto.roleId = this.registerForm.controls.role.value;
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;

      if (this.registerForm.invalid) {
          return;
      }

      this.updateContentDataItemDto();

      this.dialogService.showProgress();
      this.contentDataService.submitContentData(this.isNew, ContentDataType.Employee, this.contentDataItemDto)
        .subscribe(
          data => {
            this.dialogService.showMessage('Successfully saved!');
            this.dialogService.hideProgress();
          },
          err => {
            this.dialogService.showMessage('Failed to save');
            this.dialogService.hideProgress();
          }
        );
  }

  onDelete() {
    if (!(this.contentDataItemDto && this.contentDataItemDto.id)) {
      return;
    }

    const confirmationMessage = JSON.parse(JSON.stringify(appMessage.confirmDeletion));
    this.dialogService.showMessageDialog(confirmationMessage)
      .afterClosed()
      .subscribe(result => {
        if (result === 'OK') {
          this.contentDataService.deleteContentData(ContentDataType.Employee, this.contentDataItemDto)
            .subscribe(
              item => {
                this.dialogService.showMessage('Successfully deleted!');

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

  }
}
