import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operators/map';
import { AidDialogService } from '@ukmjkim/aid-lib-services';
import { RemoteDataTableDataSource, RemoteSearchCriteria, RemoteFilterHandlerDto, PageEvent, Sort, RemoteFilterConfigDto, DataTableDefaultValues } from '@ukmjkim/aid-data-table';
import { AppMainPermissionType } from '../../models/app-main-permission-type.enum';
import { AppMainState } from '../../models/app-main-state';
import { EmployeeSearchService } from '../../services/employee-search.service';
import { EmployeeSearchDto } from '../../models/employee-search-dto';
import { EmployeeSearchResultDto } from '../../models/employee-search-result-dto';
import { EmployeeSearchFilterConfigurator } from './conf';


export class EmployeeSearchDatasource extends RemoteDataTableDataSource<EmployeeSearchDto> {
  constructor(private AppMainState: AppMainState,
              private searchGroupFieldName: string,
              private searchGroupFieldId: number,
              private searchableFields: string[],
              private employeeSearchService: EmployeeSearchService,
              private employeeSearchFilterConfigurator: EmployeeSearchFilterConfigurator,
              private dialogService: AidDialogService) {
    super(employeeSearchFilterConfigurator, searchableFields);
  }

  getData(filterDto: RemoteFilterHandlerDto, sorts: Sort[], page: PageEvent): Observable<EmployeeSearchDto[]> {
    if (!page) {
      page = new PageEvent();
      page.pageNumber = DataTableDefaultValues.DEFAULT_PAGE_NUM;
      page.pageSize = DataTableDefaultValues.DEFAULT_PAGE_SIZE;
      return of ([]);
    }

    const searchSorts = this.getSortsParameters(sorts, []);
    const filters = this.getFiltersParameter(filterDto.filterPayload);
    const searchQueryString = (new RemoteSearchCriteria(this.searchGroupFieldName, this.searchGroupFieldId,
      page.pageNumber, page.pageSize, filters, searchSorts)).getSearchCriteriaString();

    this.dialogService.showProgress();

    return this.employeeSearchService.getEmployeeSearchById(searchQueryString)
      .pipe(
        map(data => {
          const result = data as EmployeeSearchResultDto;
          this.setTotalCount(result.totalResults);
          this.dialogService.hideProgress();
          return EmployeeSearchDto.constructFromSearchListJson(result.contracts);
        })
      );
  }

  isRowExpandable(row: EmployeeSearchDto, idx: number) {
    return false;
  }

  identify(row: EmployeeSearchDto): any {
    return row.id;
  }

  // This abstract property method returns concrete DTO, it should not be in the parent abstract class
  // Otherwise, this error - Non-abstract class does not implement inherited abstract member from class
  getNewFilterDto(searchableFieldList?: string[]): RemoteFilterHandlerDto {
    return new RemoteFilterHandlerDto(searchableFieldList);
  }


  // This abstract property method returns concrete DTO, it should not be in the parent abstract class
  // Otherwise, this error - Non-abstract class does not implement inherited abstract member from class
  getNewFilterConfigDto(): RemoteFilterConfigDto<EmployeeSearchDto> {
    return new RemoteFilterConfigDto<EmployeeSearchDto>();
  }
}
