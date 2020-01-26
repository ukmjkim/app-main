export enum PickupSearchViewEnum {
  Default = 'Default',
  Event = 'Event',
}

export function getPickupSearchViewEnum(value: string): PickupSearchViewEnum | undefined {
  const keys = Object.keys(PickupSearchViewEnum);
  const values = keys.map(k => PickupSearchViewEnum[k as any]);
  const index = values.indexOf(value);
  return index > -1 ? PickupSearchViewEnum[keys[index]] as PickupSearchViewEnum : undefined;
}
