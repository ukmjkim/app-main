import {RemoteFilterConfigurator, setupYesNoTypeFilter} from '@ukmjkim/aid-data-table';
import {EmployeeSearchDto} from '../../../models/employee-search-dto';
import {
  setupEmployeeStatusFilter} from './filter';

export class EmployeeSearchFilterConfigurator extends RemoteFilterConfigurator<EmployeeSearchDto> {
  constructor() {
    super();
  }

  setupFilterFunctions() {
    const dataDto = new EmployeeSearchDto();

    this.filterFn.set('contractConfidential', (column, preSelectedColumnPicklistValues) => setupYesNoTypeFilter(dataDto, this.filterMap, column, preSelectedColumnPicklistValues));

    this.filterFn.set('employeeStatus', (column, preSelectedColumnPicklistValues) => setupEmployeeStatusFilter(dataDto, this.filterMap, column, preSelectedColumnPicklistValues));
  }
}
