import { PickupItemType } from '../../../../models/pickup-item-type.enum';

export const setupLineTypeFilter = (dataDto: any, filterMap, column: string, preSelectedColumnPicklistValues: Array<string>): string[] => {
  preSelectedColumnPicklistValues = preSelectedColumnPicklistValues ? preSelectedColumnPicklistValues : [];

  let preSelectedValues = [];
  const uniqueValues = new Map<any, any>();

  const displayValues = new Map<any, string>();
  PickupItemType.getLineItemTypes().forEach(type => {
    const newDto = dataDto.getNew();
    newDto.lineTypeName = type.displayName;
    if (preSelectedColumnPicklistValues.indexOf(type.displayName) > -1) {
      preSelectedValues.push(type.displayName);
    }
    uniqueValues.set(type.displayName, newDto);
    displayValues.set(type.displayName, type.displayName);
  });

  filterMap.set(column, { uniqueValues: uniqueValues, displayValues: displayValues });

  return preSelectedValues;
}
