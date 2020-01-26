import { RemoteFilterConfigurator, setupYesNoTypeFilter } from '@ukmjkim/aid-data-table';
import { PickupSearchDto } from '../../../models/pickup-search-dto';
import { setupStatusFilter } from '../conf/filter/picklist-status';
import { setupLineTypeFilter } from '../conf/filter/picklist-line-type';
import { PickupColumnVariableName } from '../conf/pickup-column-variable-name.conf';

export class PickupSearchFilterConfigurator extends RemoteFilterConfigurator<PickupSearchDto> {
  constructor() {
    super();
  }

  setupFilterFunctions() {
    const dataDto = new PickupSearchDto();

    this.filterFn.set(PickupColumnVariableName.isExpress, (column, preSelectedColumnPicklistValues) => setupYesNoTypeFilter(dataDto, this.filterMap, column, preSelectedColumnPicklistValues));
    this.filterFn.set(PickupColumnVariableName.status, (column, preSelectedColumnPicklistValues) => setupStatusFilter(dataDto, this.filterMap, column, preSelectedColumnPicklistValues));
  }
}
