import {EmployeeSearchDto} from '../../../../models/employee-search-dto';
import {EmployeeStatus} from '../../../../models/employee-status.enum';

export const setupEmployeeStatusFilter = (dataDto: any, filterMap, column: string, preSelectedColumnPicklistValues: Array<string>): string[] => {
  preSelectedColumnPicklistValues = preSelectedColumnPicklistValues ? preSelectedColumnPicklistValues : [];

  const preSelectedValues = [];
  const uniqueValues = new Map<any, any>();

  const displayValues = new Map<any, string>();
  EmployeeStatus.getEmployeeStatus().forEach(type => {
    const newDto: EmployeeSearchDto = dataDto.getNew();
    newDto.contractStatus = type.displayName;
    if (preSelectedColumnPicklistValues.indexOf(type.displayName) > -1) {
      preSelectedValues.push(type.displayName);
    }
    uniqueValues.set(type.displayName, newDto);
    displayValues.set(type.displayName, type.displayName);
  });

  filterMap.set(column, { uniqueValues: uniqueValues, displayValues: displayValues });

  return preSelectedValues;
}
