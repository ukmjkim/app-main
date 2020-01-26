import { Component, ViewEncapsulation, Input, OnInit, OnDestroy, OnChanges, SimpleChanges, Injector } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { AidGlobalConfig, AidDialogService, AidLoggerService, AidMessageIndicatorService, AidIndicatorParams, AidUrlUtil } from '@ukmjkim/aid-lib-services';
import { AppMainPermissionType } from '../../models/app-main-permission-type.enum';
import { AppMainState } from '../../models/app-main-state';
import { ContentDataService } from '../../services/content-data.service';
import { ContentDataType } from '../../models/content-data-type.enum';
import { ContentDataItemDto } from '../../models/content-data-item-dto';
import { ContentDataBundle } from '../../models/content-data-bundle';
import { ContentDataBagComponent } from '../content-data-form/content-data-bag/content-data-bag.component';
import { ContentDataCustomerComponent } from '../content-data-form/content-data-customer/content-data-customer.component';
import { ContentDataDryerLogComponent } from '../content-data-form/content-data-dryer-log/content-data-dryer-log.component';
import { ContentDataDryerComponent } from '../content-data-form/content-data-dryer/content-data-dryer.component';
import { ContentDataDryingOrderComponent } from '../content-data-form/content-data-drying-order/content-data-drying-order.component';
import { ContentDataEmployeeComponent } from '../content-data-form/content-data-employee/content-data-employee.component';
import { ContentDataFarmComponent } from '../content-data-form/content-data-farm/content-data-farm.component';
import { ContentDataReleaseOrderBagComponent } from '../content-data-form/content-data-release-order-bag/content-data-release-order-bag.component';
import { ContentDataReleaseOrderComponent } from '../content-data-form/content-data-release-order/content-data-release-order.component';
import { ContentDataReleaseOrderAssignBagsComponent } from '../content-data-form/content-data-release-order-assign-bags/content-data-release-order-assign-bags.component';
import { ContentDataRoleComponent } from '../content-data-form/content-data-role/content-data-role.component';
import { ContentDataTestingCOALogComponent } from '../content-data-form/content-data-testing-coa-log/content-data-testing-coa-log.component';
import { ContentDataWorkHourComponent } from '../content-data-form/content-data-work-hour/content-data-work-hour.component';
import { ContentDataWorkShiftComponent } from '../content-data-form/content-data-work-shift/content-data-work-shift.component';
import { ContentDataWorkShiftAssignWorkersComponent } from '../content-data-form/content-data-work-shift-assign-workers/content-data-work-shift-assign-workers.component';

@Component({
    selector: 'aid-content-data',
    templateUrl: './content-data.component.html',
    styleUrls: ['./content-data.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ContentDataComponent implements OnInit, OnDestroy, OnChanges {

    @Input() id: string;
    @Input() contentDataType: ContentDataType;
    @Input() appInjector: Injector;
    @Input() appMainState: AppMainState;
    @Input() pageTitle: string;
    @Input() pageInfo: string;
    @Input() items: ContentDataItemDto[] = [];

    public AppMainPermissionType: AppMainPermissionType;

    public siteId: number;
    public eventId: number;
    public editingSalesOrder = false;
    public selectedItemList: ContentDataItemDto[] = [];

    private actionIndicatorSubscription: Subscription;

    constructor(private router: Router,
        private dialog: MatDialog,
        private dialogService: AidDialogService,
        private logger: AidLoggerService,
        private aidMessageIndicatorService: AidMessageIndicatorService,
        readonly contentDataService: ContentDataService) {
    }

    ngOnInit() {
      this.contentDataService.setUXOnly(this.appMainState.isUXOnly);
    }

    ngOnChanges(changes: SimpleChanges) {
      if (changes['AppMainState']) {
        this.contentDataService.setUXOnly(this.appMainState.isUXOnly);
      }
      if (changes['contentDataType']) {
        this.getData();
      }
    }

    ngOnDestroy() {
        if (this.actionIndicatorSubscription) {
          this.actionIndicatorSubscription.unsubscribe();
        }
    }

    getData() {
      this.dialogService.showProgress();
      this.contentDataService.getContentDataList(this.appInjector, this.contentDataType).subscribe(result => {
        this.items = ContentDataItemDto.constructFromContentDataItemListJson(result);
        this.logger.info('getData', this.items);
        this.dialogService.hideProgress();
      });
    }

    editContentData(contentDataItemDto: ContentDataItemDto) {
      this.openContentData(contentDataItemDto);
    }

    deleteContentData(contentDataItemDto: ContentDataItemDto) {
      this.openContentData(contentDataItemDto);
    }

    assignWorkHoursToWorkShift(contentDataItemDto: ContentDataItemDto) {
      this.openContentData(contentDataItemDto, true);
    }

    assignBagsToReleaseOrder(contentDataItemDto: ContentDataItemDto) {
      this.openContentData(contentDataItemDto, true);
    }

    addContentData() {
      this.openContentData(null);
    }

    openContentData(contentDataItemDto: ContentDataItemDto, customizedDialog?: boolean) {
      let dialogComponent;
      switch (this.contentDataType) {
        case ContentDataType.Bag:
          dialogComponent = ContentDataBagComponent;
          break;
        case ContentDataType.Contact:
          dialogComponent = ContentDataCustomerComponent;
          break;
        case ContentDataType.DryerLog:
          dialogComponent = ContentDataDryerLogComponent;
          break;
        case ContentDataType.Dryer:
          dialogComponent = ContentDataDryerComponent;
          break;
        case ContentDataType.DryingOrder:
          dialogComponent = ContentDataDryingOrderComponent;
          break;
        case ContentDataType.Employee:
          dialogComponent = ContentDataEmployeeComponent;
          break;
        case ContentDataType.Farm:
          dialogComponent = ContentDataFarmComponent;
          break;
        case ContentDataType.ReleaseOrderBag:
          dialogComponent = ContentDataReleaseOrderBagComponent;
          break;
        case ContentDataType.ReleaseOrder:
          if (customizedDialog) {
            dialogComponent = ContentDataReleaseOrderAssignBagsComponent;
          } else {
            dialogComponent = ContentDataReleaseOrderComponent;
          }
          break;
        case ContentDataType.Role:
          dialogComponent = ContentDataRoleComponent;
          break;
        case ContentDataType.TestingCOALog:
          dialogComponent = ContentDataTestingCOALogComponent;
          break;
        case ContentDataType.WorkHour:
          dialogComponent = ContentDataWorkHourComponent;
          break;
        case ContentDataType.WorkShift:
          if (customizedDialog) {
            dialogComponent = ContentDataWorkShiftAssignWorkersComponent;
          } else {
            dialogComponent = ContentDataWorkShiftComponent;
          }
          break;
      }

      const dialogRef = this.dialog.open(dialogComponent, {
        width: '1000px',
        height: '95vh',
        data: <ContentDataBundle> {
          contentDataType: this.contentDataType,
          contentDataItemDto: contentDataItemDto
        }
      });

      dialogRef.afterClosed().subscribe(item => {
        if (item) {
          this.getData();
        }
      });
    }

    public isReadable() {
      return this.appMainState.isAllowed(AppMainPermissionType.canViewEmployee);
    }

    public isWritable() {
      return this.appMainState.isAllowed(AppMainPermissionType.canManageEmployee);
    }
}
