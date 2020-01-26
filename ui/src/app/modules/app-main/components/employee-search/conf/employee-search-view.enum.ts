export enum EmployeeSearchViewEnum {
  Default = 'Default',
}

export function getEmployeeSearchViewEnum(value: string): EmployeeSearchViewEnum | undefined {
  const keys = Object.keys(EmployeeSearchViewEnum);
  const values = keys.map(k => EmployeeSearchViewEnum[k as any]);
  const index = values.indexOf(value);
  return index > -1 ? EmployeeSearchViewEnum[keys[index]] as EmployeeSearchViewEnum : undefined;
}
