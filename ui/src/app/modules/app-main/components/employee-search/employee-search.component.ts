import { Component, EventEmitter, Input, Output, ViewEncapsulation, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators/map';
import { Angular2Csv } from 'angular2-csv';
import { RowClickTypeEnum } from '@ukmjkim/aid-data-table';
import { AidLoggerService, AidDialogService, AidMessageIndicatorService, AidIndicatorParams, AidGlobalConfig, AidDateFormatPipe, AidUrlUtil, AidAutoCompleteSearchDto, AID_TEXT_PATTERN_OWNER_CODE } from "@ukmjkim/aid-lib-services";
import { AppMainPermissionType } from '../../models/app-main-permission-type.enum';
import { AppMainState } from '../../models/app-main-state';
import { RemoteSearchBaseComponent } from '@ukmjkim/aid-data-table';
import { EmployeeService } from '../../services/employee.service';
import { EmployeeSearchService } from '../../services/employee-search.service';
import { FilterTextRangeOwnerCodeService } from '../../services/filter-text-range-owner-code.service';
import { Employee } from '../../models/employee';
import { EmployeeSearchDto } from '../../models/employee-search-dto';
import { EmployeeSearchColumnVariableName, employeeSearchableFields } from './conf/employee-search-column-variable-name.conf';
import { EmployeeSearchFilterConfigurator } from './conf/employee-search-filter-configurator';
import { EmployeeSearchViewEnum } from './conf/employee-search-view.enum';
import { EmployeeSearchDefaultColumnsMap } from './conf/employee-search-view-template';
import { employeeDownloadFields } from './conf/employee-search-column-variable-name.conf';
import { EmployeeSearchDatasource } from './employee-search-datasource';
import { EmployeeSearchQueryService } from './employee-search-query.service';
import { EmployeeActionType } from '../../constants/employee-action-type';
import { EmployeeLinkType } from '../../constants/employee-link-type';

@Component({
  selector: 'aid-employee-search',
  templateUrl: './employee-search.component.html',
  styleUrls: ['./employee-search.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EmployeeSearchComponent extends RemoteSearchBaseComponent<EmployeeSearchDto> implements OnDestroy, OnChanges {

  @Input() id: string;
  @Input() appMainState: AppMainState;
  @Input('enableRowCheckbox') enableRowCheckbox = true;
  @Input('enableRowAction') enableRowAction = true;
  @Output() selectedRows: EventEmitter<any> = new EventEmitter<any>();

  public loadedItemList: EmployeeSearchDto[] = [];
  public selectedItemList: Employee[] = [];

  public AppMainPermissionType: AppMainPermissionType;

  readonly dateFormat = AidGlobalConfig.dateFormat;
  readonly dateFormatPipe = new AidDateFormatPipe();

  public isAdvancedShown = false;
  public permissionName: string;
  public writable = true;

  dataLoadedCallback: Subject<any> = new Subject<any>();

  private eventListInSite: { id: number, name: string }[];
  private costTypeList: { id: number, name: string }[];
  private costTypeDescriptionList: { id: number, name: string }[];

  private actionIndicatorSubscription: Subscription;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private dialogService: AidDialogService,
    private logger: AidLoggerService,
    private aidMessageIndicatorService: AidMessageIndicatorService,
    readonly employeeService: EmployeeService,
    private employeeSearchService: EmployeeSearchService,
    private employeeSearchQueryService: EmployeeSearchQueryService,
    private filterTextRangeOwnerCodeService: FilterTextRangeOwnerCodeService) {
    super(employeeSearchQueryService, true);
    this.subscribeReloadIndicator();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['AppMainState']) {
      this.employeeService.setUXOnly(this.appMainState.isUXOnly);
      this.employeeSearchService.setUXOnly(this.appMainState.isUXOnly);
    }
  }

  ngOnDestroy() {
    if (this.actionIndicatorSubscription) {
      this.actionIndicatorSubscription.unsubscribe();
    }
  }

  // implement abstract method - checkPrivilege
  checkPrivilege(): boolean {
    return true;
  }

  // implement abstract method - watchPredefinedGlobalSearchFilter
  watchPredefinedGlobalSearchFilter() {
    this.predefinedGlobalSearchFilter().subscribe(keyword => {
      this.search = keyword;
    });
  }

  // implement abstract method - loadPrerequisiteData
  loadPrerequisiteData() {
    this.employeeSearchQueryService.setAppMainState(this.appMainState);
    this.employeeSearchQueryService.loadConfiguration();
    this.employeeSearchService.getEmployeeSearchPrerequisiteData()
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
    this.filterConfigurator = new EmployeeSearchFilterConfigurator();
    this.dataSource = new EmployeeSearchDatasource(
      this.appMainState,
      this.searchGroupFieldName,
      this.searchGroupFieldId, employeeSearchableFields,
      this.employeeSearchService,
      this.filterConfigurator,
      this.dialogService);
  }

  // implement abstract method - setupFiltersDependOnSearchRange
  setupFiltersDependOnSearchRange(filterRangeResults) {
    this.logger.info('setupFiltersDependOnSearchRange filterRangeResults', filterRangeResults);
    if (filterRangeResults.length > 0) {
      this.setupNumberRangeFilters(filterRangeResults[0]);
      this.setupTextRangeFilters(filterRangeResults[0]);
    }

    this.eventListInSite = new Array<{ id: number, name: string }>();
    if (filterRangeResults && filterRangeResults.length > 1) {
      filterRangeResults[1].forEach((saleEvent: AidAutoCompleteSearchDto, index) => {
        this.eventListInSite.push({ id: Number(saleEvent.value), name: saleEvent.description });
      });
    }

    this.costTypeList = new Array<{ id: number, name: string }>();
    if (filterRangeResults && filterRangeResults.length > 2) {
      filterRangeResults[2].forEach((costType: string, index) => {
        this.costTypeList.push({ id: index, name: costType });
      });
    }

    this.costTypeDescriptionList = new Array<{ id: number, name: string }>();
    if (filterRangeResults && filterRangeResults.length > 3) {
      filterRangeResults[3].forEach((costTypeDescrpitoin: string, index) => {
        this.costTypeDescriptionList.push({ id: index, name: costTypeDescrpitoin });
      });
    }
  }

  // implement abstract method - setDefaultDisplayedColumns
  setDefaultDisplayedColumns() {
    if (!this.displayedColumns || this.displayedColumns.length === 0) {
      const searchView = this.selectedView;
      if (EmployeeSearchDefaultColumnsMap.has(searchView)) {
        this.displayedColumns = EmployeeSearchDefaultColumnsMap.get(searchView).columns.slice();
      } else {
        console.error('Cannot find given asset search view template', searchView);
        this.displayedColumns = EmployeeSearchDefaultColumnsMap.get(String(EmployeeSearchViewEnum.Default)).columns.slice();
      }
    }
  }

  // implement abstract method - setupPicklistPreSelected
  setupPicklistPreSelected(column: string) {
    this.setupPicklistFilterChoices(EmployeeSearchColumnVariableName[column], []);
  }

  private setupNumberRangeFilters(data: any) {
    if (data.amount) {
      this.filterConfigurator
        .addFilter(EmployeeSearchColumnVariableName.shootPrice, { min: data.shootPrice[0], max: data.shootPrice[1] });
    }
  }

  private setupTextRangeFilters(data: any) {
    this.filterConfigurator
      .addFilter(EmployeeSearchColumnVariableName.ownerCode, {
        validateService: this.filterTextRangeOwnerCodeService,
        textRangePattern: AID_TEXT_PATTERN_OWNER_CODE,
        textLike: 'A01',
        textMin: 'A01',
        textMax: 'Z99'
      });
  }

  // implement abstract method - watchData
  watchData(): void {
    this.dataSource.data().subscribe(data => {
      if (!this.dataLoadedCallback.isStopped) {
        this.dataLoadedCallback.next();
      }
      if (this.queryService.getGlobalSearchFilter.length === 0) {
        this.search = '';
      }

      if (data.length > 0) {
        this.queryService.setSearchResult(JSON.stringify(data));
      }

      this.loadedItemList = data;
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

      this.selectedItemList = [];
      selectedItems.forEach(sellerContractSearch => {
        console.log('selectedItem', sellerContractSearch);
        const sellerContract = this.convertEmployeeSearchDtoToEmployeeDetails(sellerContractSearch);
        this.selectedItemList.push(sellerContract);
      });

      if (this.selectedItemList.length > 0) {
        this.enableRowAction = true;
      } else {
        this.enableRowAction = false;
      }
      this.selectedRows.emit(this.selectedItemList);
    });
  }

  // implement abstract method - watchRowClicked
  watchRowClicked() {
    this.dataSource.rowClick().subscribe((row) => {
      if (row) {
        this.openGoToPage(row.data.id, this.dataSource.getRowClickType());
      }
    })
  }


  // implement abstract method - watchRowExpanded
  watchRowExpanded() {
    this.dataSource.rowExpanded().subscribe((row) => {

    });
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

    const searchQuery = this.dataSource.getCurrentSearchCriteria(this.searchGroupFieldName, this.searchGroupFieldId, this.dataSource.getTotalCount()).getSearchCriteriaString();

    this.employeeSearchService.getEmployeeSearchById(searchQuery)
      .pipe(
        map(data => EmployeeSearchDto.constructFromSearchListJson(data.contracts)),
        map(employeeList => employeeList.map(sellerContract => this.constructExportRow(sellerContract)))
      )
      .subscribe(data => {
        // Create an array of headers that matches what the UI shows to be fed into the export
        if (data.length > 0) {
          const headers = [];
          const headerVariableToName = {};
          employeeDownloadFields.forEach((column) => {
            headerVariableToName[column.field] = column.header;
          });

          // Populate the header row by using column variable name
          Object.keys(data[0]).forEach(
            (key => {
              const value = data[0][key];
              headers.push(headerVariableToName[value]);
            })
          );

          // We use a 3rd party library called Angular2Csv that takes in a JSON array of data, a file name and options
          // tslint:disable-next-line: no-unused-expression
          // new Angular2Csv(data, this.appMainState.siteName + '-Cost_List', { headers: headers });
        }
        this.dialogService.hideProgress();
      });
  }

  constructExportRow(cost: EmployeeSearchDto) {
    const retval = {};
    const array = employeeDownloadFields;


    for (const col of array) {
      if (cost.hasOwnProperty(col.field)) {
        let val = cost[col.field];

        if (typeof val === 'boolean') {
          val = cost[col.field] ? 'Yes' : 'No';
        }

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
    if (this.isReadable()) {
      this.queryService.setViewedEquipId(id);
      if (rowClickType === RowClickTypeEnum.CTRL || rowClickType === RowClickTypeEnum.RIGHT_CLICK_NEW_TAB) {
        window.open(this.getGoToLink(id, true), '_blank');
      } else if (rowClickType === RowClickTypeEnum.RIGHT_CLICK_NEW_WINDOW) {
        window.open(this.getGoToLink(id, true), '_blank', AidGlobalConfig.newWindowOptions);
      } else {
        this.router.navigateByUrl(this.getGoToLink(id, false));
      }
    } else {
      this.loadedItemList.forEach(item => {
        if (item.id === id) {
          window.open(item.salesHubContractUrl, 'sales-hub', AidGlobalConfig.newWindowOptions);
          return;
        }
      });
    }
  }

  getGoToLink(id: number, isNewTab: boolean) {
    let url: string;
    url = isNewTab ? this.appMainState.linkSet.get(EmployeeLinkType.employeeDetail.toString()) : this.appMainState.linkSet.get(EmployeeLinkType.employeeDetail.toString());

    return url
      .replace(':id', String(id));
  }

  private convertEmployeeSearchDtoToEmployeeDetails(employeeSearchDto: EmployeeSearchDto): Employee {
    const sellerContract: Employee = new Employee();
    sellerContract.contractId = employeeSearchDto.id;
    return sellerContract;
  }

  openContractDetails(cost: EmployeeSearchDto) {
    // if (cost.equipment.salesHubUrl) {
    //   window.open(cost.equipment.salesHubUrl, "_blank");
    // }
  }
  /* ====================================================================== */

  private subscribeReloadIndicator() {
    this.actionIndicatorSubscription = this.aidMessageIndicatorService.announced$.subscribe((param: AidIndicatorParams) => {
      switch (param.type) {
        case EmployeeActionType.employeeReload.toString():
          this.applyGlobalSearch();
          break;
      }
    })
  }

  public isReadable() {
    return this.appMainState.isAllowed(AppMainPermissionType.canViewEmployee);
  }

  public isWritable() {
    return this.appMainState.isAllowed(AppMainPermissionType.canManageEmployee);
  }
}
