import { PickupStatus } from '../../../../models/pickup-status.enum';

export const setupStatusFilter = (dataDto: any, filterMap, column: string, preSelectedColumnPicklistValues: Array<string>): string[] => {
  preSelectedColumnPicklistValues = preSelectedColumnPicklistValues ? preSelectedColumnPicklistValues : [];

  let preSelectedValues = [];
  const uniqueValues = new Map<any, any>();

  const displayValues = new Map<any, string>();
  PickupStatus.getItemStatuses().forEach(status => {
    const newDto = dataDto.getNew();
    newDto.localStatus = status.displayName;
    if (preSelectedColumnPicklistValues.indexOf(status.displayName) > -1) {
      preSelectedValues.push(status.displayName);
    }
    uniqueValues.set(status.displayName, newDto);
    displayValues.set(status.displayName, status.displayName);
  });

  filterMap.set(column, { uniqueValues: uniqueValues, displayValues: displayValues });

  return preSelectedValues;
}
