import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map } from 'rxjs/operators';
import { AidDialogService } from '@ukmjkim/aid-lib-services';
import { RemoteDataTableDataSource, RemoteSearchCriteria, RemoteFilterHandlerDto, PageEvent, Sort, RemoteFilterConfigDto, DataTableDefaultValues } from '@ukmjkim/aid-data-table';
import { AppMainPermissionType } from '../../models/app-main-permission-type.enum';
import { AppMainState } from '../../models/app-main-state';
import { PickupSearchService } from '../../services/pickup-search.service';
import { PickupSearchFilterConfigurator } from './conf/pickup-search-filter-configurator';
import { PickupSearchResultDto } from '../../models/pickup-search-result-dto';
import { PickupSearchDto } from '../../models/pickup-search-dto';

export class PickupSearchDatasource extends RemoteDataTableDataSource<PickupSearchDto> {
  constructor(private appMainState: AppMainState,
    private searchGroupFieldName: string,
    private searchGroupFieldId: number,
    private searchableFields: string[],
    private pickupSearchService: PickupSearchService,
    private purchaseOrderSearchFilterConfigurator: PickupSearchFilterConfigurator,
    private dialogService: AidDialogService) {
    super(purchaseOrderSearchFilterConfigurator, searchableFields);
  }

  getData(filterDto: RemoteFilterHandlerDto, sorts: Sort[], page: PageEvent): Observable<PickupSearchDto[]> {
    if (!page) {
      page = new PageEvent();
      page.pageNumber = DataTableDefaultValues.DEFAULT_PAGE_NUM;
      page.pageSize = DataTableDefaultValues.DEFAULT_PAGE_SIZE;
      return of([]);
    }

    const searchSorts = this.getSortsParameters(sorts, []);
    const filters = this.getFiltersParameter(filterDto.filterPayload);
    const searchQueryString = (new RemoteSearchCriteria(this.searchGroupFieldName, this.searchGroupFieldId,
      page.pageNumber, page.pageSize, filters, searchSorts)).getSearchCriteriaString();

    this.dialogService.showProgress();

    return this.pickupSearchService.getPickupSearchById(this.appMainState.siteId, this.appMainState.eventId, searchQueryString)
      .pipe(
        map(data => {
          console.log('getData pickupSearchService', data);
          const result = data as PickupSearchResultDto;
          this.setTotalCount(result.totalResults);
          this.dialogService.hideProgress();
          return PickupSearchDto.constructFromSearchListJson(result.pickups);
        })
      );
  }

  isRowExpandable(row: PickupSearchDto, idx: number) {
    return row && row.numberOfItems && row.numberOfItems > 0;
  }

  identify(row: PickupSearchDto): any {
    return row.pickupId;
  }

  // This abstract property method returns concrete DTO, it should not be in the parent abstract class
  // Otherwise, this error - Non-abstract class does not implement inherited abstract member from class
  getNewFilterDto(searchableFieldList?: string[]): RemoteFilterHandlerDto {
    return new RemoteFilterHandlerDto(searchableFieldList);
  }


  // This abstract property method returns concrete DTO, it should not be in the parent abstract class
  // Otherwise, this error - Non-abstract class does not implement inherited abstract member from class
  getNewFilterConfigDto(): RemoteFilterConfigDto<PickupSearchDto> {
    return new RemoteFilterConfigDto<PickupSearchDto>();
  }
}
