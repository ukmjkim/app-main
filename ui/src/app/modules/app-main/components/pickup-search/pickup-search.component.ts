import {
  Component,
  Input,
  Output,
  ViewEncapsulation,
  EventEmitter
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { map } from 'rxjs/operators/map';
import { Observable } from 'rxjs/Observable';
import { Subscription } from "rxjs";
import { Angular2Csv } from 'angular2-csv';
import { RowClickTypeEnum } from '@ukmjkim/aid-data-table';
import { AidLoggerService, AidDialogService, AidMessageIndicatorService, AidIndicatorParams, AidDateFormatPipe, AidGlobalConfig, AidAutoCompleteSearchDto } from '@ukmjkim/aid-lib-services';
import { AppMainPermissionType } from '../../models/app-main-permission-type.enum';
import { AppMainState } from '../../models/app-main-state';
import { RemoteSearchBaseComponent } from '@ukmjkim/aid-data-table';
import { PickupService } from '../../services/pickup.service';
import { PickupSearchService } from '../../services/pickup-search.service';

import { Pickup } from '../../models/pickup';
import { PickupSearchDto } from '../../models/pickup-search-dto';
import { PickupSubItem } from '../../models/pickup-sub-item';
import { PickupItemType } from '../../models/pickup-item-type.enum';
import { PickupColumnVariableName, pickupSearchableFields } from './conf/pickup-column-variable-name.conf';
import { PickupSearchFilterConfigurator } from './conf/pickup-search-filter-configurator';
import { PickupSearchViewEnum } from './conf/pickup-search-view.enum';
import { PickupSearchDefaultColumnsMap } from './conf/pickup-search-view-template';
import { pickupDownloadFields } from './conf/pickup-column-variable-name.conf';
import { PickupSearchDatasource } from './pickup-search-datasource';
import { PickupSearchQueryService } from './pickup-search-query.service';
import { MatDialog } from '@angular/material';
import {
  New,
  InProgress,
  Completed,
  Canceled
} from '../../constants/pickup-dashboard-state';
import { PickupActionType } from '../../constants/pickup-action-type';
import { PickupLinkType } from '../../constants/link-type';

@Component({
  selector: 'aid-pickup-search',
  templateUrl: './pickup-search.component.html',
  styleUrls: ['./pickup-search.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PickupSearchComponent extends RemoteSearchBaseComponent<PickupSearchDto> {

  @Input() id: string;
  @Input() appMainState: AppMainState;
  @Input('enableRowCheckbox') enableRowCheckbox: boolean = true;
  @Output() selectedRows: EventEmitter<number[]> = new EventEmitter<number[]>();

  readonly PickupItemType = PickupItemType;

  readonly dateFormatPipe = new AidDateFormatPipe();

  public isAdvancedShown: boolean = false;
  public enableRowAction: boolean = false;
  public permissionName: string;

  dataLoadedCallback: Subject<any> = new Subject<any>();

  private eventListInSite: { id: number, name: string }[];

  private actionIndicatorSubscription: Subscription;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private aidMessageIndicatorService: AidMessageIndicatorService,
    private pickupSearchService: PickupSearchService,
    private pickupSearchQueryService: PickupSearchQueryService,
    private dialog: MatDialog,
    private logger: AidLoggerService,
    private dialogService: AidDialogService,
    public pickupService: PickupService) {
    super(pickupSearchQueryService, true);
    this.subscribeMessageIndicator();
  }

  // implement abstract method - checkPrivilege
  checkPrivilege(): boolean {
    return true;
  }

  // implement abstract method - watchPredefinedGlobalSearchFilter
  watchPredefinedGlobalSearchFilter() {
    this.predefinedGlobalSearchFilter().subscribe(keyword => {
      this.search = keyword;
    })
  }

  // implement abstract method - loadPrerequisiteData
  loadPrerequisiteData() {
    this.pickupSearchService.setUXOnly(this.appMainState.isUXOnly);
    this.pickupService.setUXOnly(this.appMainState.isUXOnly);
    this.pickupSearchQueryService.setAppMainState(this.appMainState);
    this.pickupSearchQueryService.loadConfiguration();
    this.pickupSearchService.getPickupSearchRange(this.appMainState.siteId, this.appMainState.eventId)
      .pipe(
      )
      .subscribe(response => {
        const filterRangeResults = response as Array<any>;
        this.prerequisiteData.next(filterRangeResults);
      });
  }

  // implement abstract method - setupFilterConfiguratorAndDataSource
  setupFilterConfiguratorAndDataSource() {
    this.searchGroupFieldName = 'groupId';
    this.searchGroupFieldId = this.appMainState.eventId && this.appMainState.eventId > 0 ? this.appMainState.eventId : this.appMainState.siteId;

    this.filterConfigurator = new PickupSearchFilterConfigurator();
    this.dataSource = new PickupSearchDatasource(
      this.appMainState,
      this.searchGroupFieldName,
      this.searchGroupFieldId,
      pickupSearchableFields,
      this.pickupSearchService,
      this.filterConfigurator,
      this.dialogService);
  }

  // implement abstract method - setupFiltersDependOnSearchRange
  setupFiltersDependOnSearchRange(filterRangeResults) {
    this.logger.info('setupFiltersDependOnSearchRange filterRangeResults', filterRangeResults);
    if (filterRangeResults.length > 0) {
      this.setupNumberRangeFilters(filterRangeResults[0]);
      this.setupDateRangeFilters(filterRangeResults[0]);
      this.setupTextRangeFilters(filterRangeResults[0]);
    }

    this.eventListInSite = new Array<{ id: number, name: string }>();
    if (filterRangeResults && filterRangeResults.length > 1) {
      filterRangeResults[1].forEach((saleEvent: AidAutoCompleteSearchDto, index) => {
        this.eventListInSite.push({ id: Number(saleEvent.value), name: saleEvent.description });
      });
    }
  }

  // implement abstract method - setDefaultDisplayedColumns
  setDefaultDisplayedColumns() {
    if (!this.displayedColumns || this.displayedColumns.length === 0) {
      let searchView = this.selectedView;
      if (PickupSearchDefaultColumnsMap.has(searchView)) {
        this.displayedColumns = PickupSearchDefaultColumnsMap.get(searchView).columns.slice();
      } else {
        console.error('Cannot find given asset search view template', searchView);
        this.displayedColumns = PickupSearchDefaultColumnsMap.get(String(PickupSearchViewEnum.Default)).columns.slice();
      }
    }
  }

  // implement abstract method - setupPicklistPreSelected
  setupPicklistPreSelected(column: string) {
    this.setupPicklistFilterChoices(PickupColumnVariableName[column], []);
  }

  private setupNumberRangeFilters(data: any) {
    if (data.numberOfItems) {
      this.filterConfigurator
        .addFilter(PickupColumnVariableName.numberOfItems, { min: data.numberOfItems[0], max: data.numberOfItems[1] });
    }
  }

  private setupDateRangeFilters(data: any) {
    if (data.createdTS) {
      this.filterConfigurator
        .addFilter(PickupColumnVariableName.createdTS, { min: data.createdTS[0], max: data.createdTS[1] });
    }
  }

  private setupTextRangeFilters(data: any) {

  }

  // implement abstract method - watchData
  watchData(): void {
    this.dataSource.data().subscribe(data => {
      if (!this.dataLoadedCallback.isStopped) this.dataLoadedCallback.next();
      if (this.queryService.getGlobalSearchFilter.length === 0) {
        this.search = '';
      }

      if (data.length > 0) {
        this.queryService.setSearchResult(JSON.stringify(data));
      }
    });
  }

  // implement abstract method - watchSelectedRows
  watchSelectedRows(): void {
    this.dataSource.selection().subscribe((selectedItems) => {
      if (selectedItems.length < this.numberOfItemsPerPage) {
        this.allItemsSelected = false;
      }
      this.selectedItems = selectedItems;
      this.updateNumberOfSelectedItems();
      let selectedItemList: number[] = [];
      selectedItems.forEach(item => {
        selectedItemList.push(item.pickupId);
      });
      if (selectedItems.length > 0) {
        this.enableRowAction = true;
      } else {
        this.enableRowAction = false;
      }
      this.selectedRows.emit(selectedItemList);
    });
  }

  // implement abstract method - watchRowClicked
  watchRowClicked() {
    this.dataSource.rowClick().subscribe((row) => {
      if (row) {
        this.openGoToPage(row.data.pickupId, this.dataSource.getRowClickType());
      }
    })
  }


  // implement abstract method - watchRowExpanded
  watchRowExpanded() {
    this.dataSource.rowExpanded().subscribe((row) => {
      if (row && row.data.numberOfItems > 0) {
        if (!row.data.items || row.data.items.length === 0) {
          this.logger.info('Lazy Loading for Pickups Lots...');
          this.getSubTableData(row.data.pickupId).subscribe(subitems => {
            row.data.items = subitems;
          });
        }
      }
    });
  }


  private getSubTableData(orderNumber: number): Observable<PickupSubItem[]> {
    this.dialogService.showProgress();

    return this.pickupSearchService.getPickupSubItemsByOrderNumber(this.appMainState.siteId, orderNumber)
      .pipe(
        map(lineItemList => {
          this.dialogService.hideProgress();
          return lineItemList;
        }));
  }

  // override class method - watchTotalNumberOfItems
  watchTotalNumberOfItems(): void {
    this.dataSource.rowCount().subscribe(numberOfItems => this.numberOfItems = numberOfItems);
    this.updateNumberOfSelectedItems();
  }


  applyGlobalSearch() {
    if (this.search) {
      this.dataSource.requestGlobalSearchFilter(this.search);
      this.queryService.addGlobalSearchFilterValue(this.search);
    }
    this.callSearchAPI();
  }


  /* ====================================================================== */
  /* EXPORT DATA TO EXCEL - START */
  exportToExcel() {
    this.dialogService.showProgress();

    let searchQuery = this.dataSource.getCurrentSearchCriteria(this.searchGroupFieldName, this.searchGroupFieldId, 0).getSearchCriteriaString();

    this.pickupSearchService.getPickupSearchById(this.appMainState.siteId, this.appMainState.eventId, searchQuery)
      .pipe(
        map(data => PickupSearchDto.constructFromSearchListJson(data)),
        map(poList => poList.map(data => this.constructExportRow(data)))
      )
      .subscribe(data => {
        //Create an array of headers that matches what the UI shows to be fed into the export
        if (data.length > 0) {
          let headers = [];
          let headerVariableToName = {};
          pickupDownloadFields.forEach((column) => {
            headerVariableToName[column.field] = column.header;
          });
          // Populate the header row by using column variable name
          for (let prop in data[0]) {
            headers.push(headerVariableToName[prop]);
          }

          // We use a 3rd party library called Angular2Csv that takes in a JSON array of data, a file name and options
          new Angular2Csv(data, this.appMainState.siteName + '-Pickup_List', { headers: headers });
        }
        //this.dialogService.hideProgress();
      });
  }

  constructExportRow(po: PickupSearchDto) {
    let retval = {};
    let array = pickupDownloadFields;

    for (let col of array) {
      if (po.hasOwnProperty(col.field)) {
        let val = po[col.field];

        if (col.field === 'createdTS') {
          retval[col.field] = this.dateFormatPipe.transformDate(val);
        } else {
          retval[col.field] = val;
        }
      } else {
        retval[col.field] = '';
      }
    }
    return retval;
  }
  /* EXPORT DATA TO EXCEL - END */
  /* ====================================================================== */


  toggleAdvancedSearch() {
    this.isAdvancedShown = !this.isAdvancedShown;
    return this.isAdvancedShown;
  }

  openGoToPage(id: number, rowClickType: RowClickTypeEnum): void {
    this.queryService.setViewedEquipId(id);
    if (rowClickType === RowClickTypeEnum.CTRL || rowClickType === RowClickTypeEnum.RIGHT_CLICK_NEW_TAB) {
      window.open(this.getGoToLink(id, true), '_blank');
    } else if (rowClickType === RowClickTypeEnum.RIGHT_CLICK_NEW_WINDOW) {
      window.open(this.getGoToLink(id, true), '_blank', AidGlobalConfig.newWindowOptions);
    } else {
      this.router.navigateByUrl(this.getGoToLink(id, false));
    }
  }

  getGoToLink(orderNumber: number, isNewTab: boolean) {
    let url: string;
    if (this.appMainState.eventId && this.appMainState.eventId !== undefined && this.appMainState.eventId > 0) {
      url = isNewTab ? this.appMainState.linkSet.get(PickupLinkType.eventPickupDetailOnNewTab.toString()) : this.appMainState.linkSet.get(PickupLinkType.eventPickupDetail.toString());
    } else {
      url = isNewTab ? this.appMainState.linkSet.get(PickupLinkType.sitePickupDetailOnNewTab.toString()) : this.appMainState.linkSet.get(PickupLinkType.sitePickupDetail.toString());
    }

    return url
      .replace(':siteId', String(this.appMainState.siteId))
      .replace(':eventId', String(this.appMainState.eventId))
      .replace(':orderNumber', String(orderNumber));
  }


  /* ====================================================================== */

  ngOnDestroy() {

  }

  public isReadable() {
    return this.appMainState.isAllowed(AppMainPermissionType.canViewEmployee);
  }

  public isWritable() {
    return this.appMainState.isAllowed(AppMainPermissionType.canManageEmployee);
  }


  private subscribeMessageIndicator() {
    this.actionIndicatorSubscription = this.aidMessageIndicatorService.announced$.subscribe((param: AidIndicatorParams) => {
      switch (param.type) {
        case PickupActionType.purchaseOrderReload.toString():
          this.logger.info("PickupSearchComponent > subscribeMessageIndicator", param);
          this.search = param.data;
          this.switchSearchView(PickupSearchViewEnum.Default, param.data, true);
          break;
      }
    })
  }
}
