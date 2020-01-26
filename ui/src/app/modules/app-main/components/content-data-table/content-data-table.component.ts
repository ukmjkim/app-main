import { Component, OnInit, OnChanges, EventEmitter, Input, OnDestroy, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { Angular2Csv } from 'angular2-csv';
import { ColHeaderTypeEnum } from '@ukmjkim/aid-data-table';
import { AidLoggerService, AidDialogService, AidMessageIndicatorService, AidIndicatorParams, AidGlobalConfig, AidUrlUtil, AidDateFormatPipe } from '@ukmjkim/aid-lib-services';
import { AppMainState } from '../../models/app-main-state';
import { AppMainPermissionType } from '../../models/app-main-permission-type.enum';
import { ContentDataType } from '../../models/content-data-type.enum';
import { ContentDataItemDto } from '../../models/content-data-item-dto';
import { ContentDataTableDataSource } from './content-data-table-data-source';
import { CONTENT_DATA_TABLE_COLUMNS,
  BAG_CONTENT_DATA_TABLE_COLUMNS_AS_ARRAY,
  BAG_CONTENT_DATA_TABLE_COLUMNS_DISPLAY_DOWNLOAD,
  CONTACT_CONTENT_DATA_TABLE_COLUMNS_AS_ARRAY,
  DRYER_LOG_CONTENT_DATA_TABLE_COLUMNS_AS_ARRAY,
  DRYER_CONTENT_DATA_TABLE_COLUMNS_AS_ARRAY,
  DRYING_ORDER_CONTENT_DATA_TABLE_COLUMNS_AS_ARRAY,
  EMPLOYEE_CONTENT_DATA_TABLE_COLUMNS_AS_ARRAY,
  FARM_CONTENT_DATA_TABLE_COLUMNS_AS_ARRAY,
  RELEASE_ORDER_BAG_CONTENT_DATA_TABLE_COLUMNS_AS_ARRAY,
  RELEASE_ORDER_CONTENT_DATA_TABLE_COLUMNS_AS_ARRAY,
  ROLE_CONTENT_DATA_TABLE_COLUMNS_AS_ARRAY,
  TESTING_COA_LOG_CONTENT_DATA_TABLE_COLUMNS_AS_ARRAY,
  WORK_HOUR_CONTENT_DATA_TABLE_COLUMNS_AS_ARRAY,
  WORK_SHIFT_CONTENT_DATA_TABLE_COLUMNS_AS_ARRAY
} from './content-data-table-columns';

@Component({
  selector: 'aid-content-data-table',
  templateUrl: './content-data-table.component.html',
  styleUrls: ['./content-data-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContentDataTableComponent implements OnInit, OnChanges, OnDestroy {

  @Input() id: string;
  @Input() contentDataType: ContentDataType;
  @Input() appMainState: AppMainState;
  @Input() items: ContentDataItemDto[] = [];
  @Input() enableEdit: boolean;
  @Input() closed: boolean;
  @Output() selectedRows: EventEmitter<ContentDataItemDto[]> = new EventEmitter<ContentDataItemDto[]>();
  @Output() editRow: EventEmitter<ContentDataItemDto> = new EventEmitter<ContentDataItemDto>();
  @Output() deleteRow: EventEmitter<ContentDataItemDto> = new EventEmitter<ContentDataItemDto>();
  @Output() assignWorkHoursRow: EventEmitter<ContentDataItemDto> = new EventEmitter<ContentDataItemDto>();
  @Output() assignBagsRow: EventEmitter<ContentDataItemDto> = new EventEmitter<ContentDataItemDto>();

  public searchString: string;
  public selectedLineItems: ContentDataItemDto[];
  public totalAmount: number;
  public totalCosts: number;
  public totalCredits: number;

  dataSource: ContentDataTableDataSource;
  columnsToShow: string[];
  pageSizeOptions = [];
  pageSize = 200;

  dateFormat: string;
  dateTimeFormat: string;

  // Expose in template
  readonly COLUMNS = CONTENT_DATA_TABLE_COLUMNS;
  readonly ColHeaderTypeEnum = ColHeaderTypeEnum;

  public ContentDataType = ContentDataType;

  private actionIndicatorSubscription: Subscription;

  constructor(
    private router: Router,
    private sanitizer: DomSanitizer,
    private logger: AidLoggerService,
    private dialog: MatDialog,
    private dialogService: AidDialogService,
    private aidMessageIndicatorService: AidMessageIndicatorService) {
    this.setupDisplayColumnAndDataSource();
  }

  ngOnInit() {
    this.dateFormat = this.appMainState.dateFormat;
    this.dateTimeFormat = this.appMainState.dateTimeFormat;
    setTimeout(() => {
      this.watchData();
      this.watchSelectedRows();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['items']) {
      this.reloadData();
    }
  }

  ngOnDestroy() {
    if (this.actionIndicatorSubscription) this.actionIndicatorSubscription.unsubscribe();
  }

  setupDisplayColumnAndDataSource() {
    if (this.contentDataType) {
      switch (this.contentDataType) {
        case ContentDataType.Bag:
          this.columnsToShow = BAG_CONTENT_DATA_TABLE_COLUMNS_AS_ARRAY.map(col => col.field);
          this.dataSource = new ContentDataTableDataSource(BAG_CONTENT_DATA_TABLE_COLUMNS_AS_ARRAY);
          break;
        case ContentDataType.Contact:
          this.columnsToShow = CONTACT_CONTENT_DATA_TABLE_COLUMNS_AS_ARRAY.map(col => col.field);
          this.dataSource = new ContentDataTableDataSource(CONTACT_CONTENT_DATA_TABLE_COLUMNS_AS_ARRAY);
          break;
        case ContentDataType.DryerLog:
          this.columnsToShow = DRYER_LOG_CONTENT_DATA_TABLE_COLUMNS_AS_ARRAY.map(col => col.field);
          this.dataSource = new ContentDataTableDataSource(DRYER_LOG_CONTENT_DATA_TABLE_COLUMNS_AS_ARRAY);
          break;
        case ContentDataType.Dryer:
          this.columnsToShow = DRYER_CONTENT_DATA_TABLE_COLUMNS_AS_ARRAY.map(col => col.field);
          this.dataSource = new ContentDataTableDataSource(DRYER_CONTENT_DATA_TABLE_COLUMNS_AS_ARRAY);
          break;
        case ContentDataType.DryingOrder:
          this.columnsToShow = DRYING_ORDER_CONTENT_DATA_TABLE_COLUMNS_AS_ARRAY.map(col => col.field);
          this.dataSource = new ContentDataTableDataSource(DRYING_ORDER_CONTENT_DATA_TABLE_COLUMNS_AS_ARRAY);
          break;
        case ContentDataType.Employee:
          this.columnsToShow = EMPLOYEE_CONTENT_DATA_TABLE_COLUMNS_AS_ARRAY.map(col => col.field);
          this.dataSource = new ContentDataTableDataSource(EMPLOYEE_CONTENT_DATA_TABLE_COLUMNS_AS_ARRAY);
          break;
        case ContentDataType.Farm:
          this.columnsToShow = FARM_CONTENT_DATA_TABLE_COLUMNS_AS_ARRAY.map(col => col.field);
          this.dataSource = new ContentDataTableDataSource(FARM_CONTENT_DATA_TABLE_COLUMNS_AS_ARRAY);
          break;
        case ContentDataType.ReleaseOrderBag:
          this.columnsToShow = RELEASE_ORDER_BAG_CONTENT_DATA_TABLE_COLUMNS_AS_ARRAY.map(col => col.field);
          this.dataSource = new ContentDataTableDataSource(RELEASE_ORDER_BAG_CONTENT_DATA_TABLE_COLUMNS_AS_ARRAY);
          break;
        case ContentDataType.ReleaseOrder:
          this.columnsToShow = RELEASE_ORDER_CONTENT_DATA_TABLE_COLUMNS_AS_ARRAY.map(col => col.field);
          this.dataSource = new ContentDataTableDataSource(RELEASE_ORDER_CONTENT_DATA_TABLE_COLUMNS_AS_ARRAY);
          break;
        case ContentDataType.Role:
          this.columnsToShow = ROLE_CONTENT_DATA_TABLE_COLUMNS_AS_ARRAY.map(col => col.field);
          this.dataSource = new ContentDataTableDataSource(ROLE_CONTENT_DATA_TABLE_COLUMNS_AS_ARRAY);
          break;
        case ContentDataType.TestingCOALog:
          this.columnsToShow = TESTING_COA_LOG_CONTENT_DATA_TABLE_COLUMNS_AS_ARRAY.map(col => col.field);
          this.dataSource = new ContentDataTableDataSource(TESTING_COA_LOG_CONTENT_DATA_TABLE_COLUMNS_AS_ARRAY);
          break;
        case ContentDataType.WorkHour:
          this.columnsToShow = WORK_HOUR_CONTENT_DATA_TABLE_COLUMNS_AS_ARRAY.map(col => col.field);
          this.dataSource = new ContentDataTableDataSource(WORK_HOUR_CONTENT_DATA_TABLE_COLUMNS_AS_ARRAY);
          break;
        case ContentDataType.WorkShift:
          this.columnsToShow = WORK_SHIFT_CONTENT_DATA_TABLE_COLUMNS_AS_ARRAY.map(col => col.field);
          this.dataSource = new ContentDataTableDataSource(WORK_SHIFT_CONTENT_DATA_TABLE_COLUMNS_AS_ARRAY);
          break;
      }
    }
    this.logger.info('COLUMNS', this.COLUMNS);
    this.logger.info('columnsToShow', this.columnsToShow);
    this.logger.info('dataSource', this.dataSource);
  }

  reloadData() {
    if (!(this.dataSource && this.columnsToShow && this.columnsToShow.length > 0)) {
      this.setupDisplayColumnAndDataSource();
    }

    this.items.sort((a, b) => (+a.id > +b.id) ? 1 : ((+b.id > +a.id) ? -1 : 0));
    this.dataSource.setLoadedData(this.items);
    this.dataSource.deselectAll();
    this.dataSource.expandAll();
  }

  applyFilter() {
    this.applyFilterByString();
  }

  applyFilterByString() {
    this.dataSource.setLocalFilter(this.searchString);
  }

  watchData(): void {
    this.dataSource.data().subscribe(() => {
      this.dataSource.expandAll();
    });
  }

  // implement abstract method - watchSelectedRows
  watchSelectedRows(): void {
    this.dataSource.selection().subscribe((selectedItems) => {
      this.selectedRows.emit(selectedItems);
    });
  }

  public exportToExcel() {
    const filteredData = this.dataSource.getFilteredData();
    if (filteredData.length > 0) {
      const dateFormatPipe = new AidDateFormatPipe();
      const converteList = filteredData.map(item => this.constructExportRow(item, dateFormatPipe));

      console.log('exportToExcel converteList', converteList);

      let headers = [];
      let headerVariableToName = {};
      BAG_CONTENT_DATA_TABLE_COLUMNS_DISPLAY_DOWNLOAD.forEach(column => {
        headerVariableToName[column.field] = column.header;
        console.log('exportToExcel', column);
      });

      for (let prop in converteList[0]) {
        headers.push(headerVariableToName[prop] === undefined ? prop : headerVariableToName[prop]);
      }

      // We use a 3rd party library called Angular2Csv that takes in a JSON array of data, a file name and options
      new Angular2Csv(converteList, this.contentDataType.displayName, {headers: headers});
    }
  }

  constructExportRow(dto: ContentDataItemDto, dateFormatPipe: AidDateFormatPipe) {
    let retval = {};
    const array = BAG_CONTENT_DATA_TABLE_COLUMNS_DISPLAY_DOWNLOAD;

    for (let col of array) {
      if (dto.hasOwnProperty(col.field)) {
        let val = dto[col.field];
        if (typeof val === 'boolean') {
          val = dto[col.field] ? 'Yes' : 'No';
        } else if (typeof val === 'string' && col.field.toString().indexOf('DateTime') > -1) {
          console.log('constructExportRow col.field', col.field);
          val = dateFormatPipe.transformDate(dto[col.field]);
        }
        retval[col.field] = val;
      } else {
        retval[col.field] = '';
      }
    }
    return retval;
  }

  public editItem(contentDataItemDto: ContentDataItemDto) {
    this.editRow.emit(contentDataItemDto);
  }

  public deleteItem(contentDataItemDto: ContentDataItemDto) {
    this.deleteRow.emit(contentDataItemDto);
  }

  public assignWorkHoursItem(contentDataItemDto: ContentDataItemDto) {
    this.assignWorkHoursRow.emit(contentDataItemDto);
  }

  public assignBagsItem(contentDataItemDto: ContentDataItemDto) {
    this.assignBagsRow.emit(contentDataItemDto);
  }

  public isEmployeeReadable() {
    return this.appMainState.isAllowed(AppMainPermissionType.canViewEmployee);
  }

  public isEmployeeWritable() {
    return this.appMainState.isAllowed(AppMainPermissionType.canManageEmployee);
  }
}
