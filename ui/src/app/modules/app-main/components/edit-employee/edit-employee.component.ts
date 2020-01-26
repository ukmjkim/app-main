import { Component, Input, OnInit, OnChanges, OnDestroy, SimpleChanges, ViewChild, ComponentRef, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { AidDialogService, AidLoggerService, AidMessageIndicatorService, AidIndicatorParams, AidUrlUtil, AidGlobalConfig } from '@ukmjkim/aid-lib-services';
import { AidSlidePanelComponent } from '@ukmjkim/aid-ux-components';
import { AppMainState } from '../../models/app-main-state';
import { AppMainPermissionType } from '../../models/app-main-permission-type.enum';
import { Employee } from '../../models/employee';
import { EmployeeAuctionItemDto } from '../../models/employee-auction-item-dto';
import { EmployeeAssetItemDto } from '../../models/employee-asset-item-dto';
import { EmployeeSearchDto } from '../../models/employee-search-dto';
import { EmployeeService } from '../../services/employee.service';
import { EmployeeActionType } from '../../constants/employee-action-type';
import { EmployeeLinkType } from '../../constants/employee-link-type';
import { EmployeeSearchQueryService } from '../employee-search/employee-search-query.service';
import { EmployeeCostItemDto } from '../../models/employee-cost-item-dto';

@Component({
  selector: 'aid-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditEmployeeComponent implements OnInit, OnChanges, OnDestroy {

  @Input() id: string;
  @Input() serviceType = '';
  @Input() appMainState: AppMainState;

  @ViewChild('CostPanel', {static: false}) costPanel: AidSlidePanelComponent;

  public showCostDialog = false;

  public employee: Employee;
  public employeeAuctionList: EmployeeAuctionItemDto[] = [];
  public employeeAssetList: EmployeeAssetItemDto[] = [];
  public employeeSearchDtoList: EmployeeSearchDto[] = [];
  public employeeSearchDtoListCursor = 0;

  private actionIndicatorSubscription: Subscription;

  constructor(private router: Router,
    private dialog: MatDialog,
    private dialogService: AidDialogService,
    private logger: AidLoggerService,
    readonly employeeService: EmployeeService,
    readonly employeeSearchQueryService: EmployeeSearchQueryService,
    private aidMessageIndicatorService: AidMessageIndicatorService) {
  }

  ngOnInit() {
    this.subscribeMessageIndicator();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['AppMainState']) {
      this.employeeService.setUXOnly(this.appMainState.isUXOnly);
      this.loadEmployeeData();
    }
  }

  ngOnDestroy() {
    if (this.actionIndicatorSubscription) {
      this.actionIndicatorSubscription.unsubscribe();
    }
  }

  returnToList() {
    const url = this.appMainState.linkSet.get(EmployeeLinkType.employeeSearch.toString());

    const builder = AidUrlUtil.getInstance().getUrlBuilder(url);
    const finalURL = builder.get();

    this.router.navigate([finalURL]);
  }

  navigatePage(id: number) {
    const url = this.appMainState.linkSet.get(EmployeeLinkType.employeeDetail.toString());

    const builder = AidUrlUtil.getInstance().getUrlBuilder(url);
    builder.setNamedParameter('id', '' + id);
    const finalURL = builder.get();
    this.router.navigate([finalURL]);
  }


  openSellerCostPrintForm() {
    const url = this.appMainState.linkSet.get(EmployeeLinkType.employeePrintForm.toString());

    const contractIds: number[] = [];
    contractIds.push(this.employee.contractId);

    let ids = contractIds.toString();
    ids = ids.replace('[', '').replace(']', '');

    const builder = AidUrlUtil.getInstance().getUrlBuilder(url);
    builder.setNamedParameter('ids', ids);
    const finalURL = builder.get();

    window.open(finalURL, 'print-form', AidGlobalConfig.newWindowOptions);
  }

  private loadEmployeeData() {
    if (!this.appMainState.id) return;

    this.dialogService.showProgress();
    this.employeeService.getEmployee(this.appMainState.id)
      .subscribe(
        employee => {
          this.employee = employee;
          this.loadSearchResult();
          this.dialogService.hideProgress();
        },
        error => {
          this.dialogService.showMessage('Failed to load Contract Details');
          this.dialogService.hideProgress();
          this.logger.error(error);
        }
      );

    this.employeeService.getEmployeeAssetList(this.appMainState.id)
      .subscribe(
        assets => {
          this.employeeAssetList = assets;
          this.dialogService.hideProgress();
        },
        error => {
          this.dialogService.showMessage('Failed to load Contract Assets');
          this.dialogService.hideProgress();
          this.logger.error(error);
        }
      );

    this.employeeService.getEmployeeAuctionList(this.appMainState.id)
      .subscribe(
        auctions => {
          this.employeeAuctionList = auctions;
          this.dialogService.hideProgress();
        },
        error => {
          this.dialogService.showMessage('Failed to load Contract Auctions');
          this.dialogService.hideProgress();
          this.logger.error(error);
        }
      );
  }


  private loadSearchResult() {
    console.log('loadSearchResult()', this.employee);
    const searchResult = this.employeeSearchQueryService.getSearchResultFromCache();
    if (searchResult) {
      this.employeeSearchDtoList = EmployeeSearchDto.constructFromSearchListJson(JSON.parse(searchResult));
      let idx = 0;
      this.employeeSearchDtoList.forEach(employeeSearchDto => {
        if (employeeSearchDto.id === this.employee.contractId) {
          this.employeeSearchDtoListCursor = idx;
          return;
        }
        idx++;
      });
    }
  }

  private subscribeMessageIndicator() {
    this.actionIndicatorSubscription = this.aidMessageIndicatorService.announced$.subscribe((param: AidIndicatorParams) => {
      switch (param.type) {
        case EmployeeActionType.employeeReload.toString():
          this.loadEmployeeData();
          break;
      }
    });
  }
}
