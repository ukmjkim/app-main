export const EMPLOYEE_TYPES_COLOR = {
  sag: '#36AE4F',
  straight: '#1B7D42',
  guarantee: '#15427C',
  netGuarantee: '#005997',
  purchase: '#1091EB',
  inventory: '#f16913',
  signed: '#1B7D42',
  unsigned: '#FFA500',
  deleted: '#DA461F'
};

export const EMPLOYEE_TYPES_STYLE = {
  sag: 'light-green',
  straight: 'green',
  guarantee: 'dark-blue',
  netGuarantee: 'blue',
  purchase: 'light-blue',
  inventory: 'orange',
  signed: 'green',
  unsigned: 'orange',
  deleted: 'red'
};

export interface EmployeeDashboardTypes {
  index: number;
  name: string;
  label: string;
  value: string;
  icon: string;
  styleClass: string;
  dashboardColor: string;
  svgIcon?: string;
}

export const straight = {
  index: 1,
  name: 'straight',
  label: 'Straight',
  value: 'Straight',
  icon: 'rate_reviewed',
  styleClass: EMPLOYEE_TYPES_STYLE.straight,
  dashboardColor: EMPLOYEE_TYPES_COLOR.straight
};

export const netGuarantee = {
  index: 1,
  name: 'netGuarantee',
  label: 'Net Guarantee',
  value: 'Net Guarantee',
  icon: 'rate_reviewed',
  styleClass: EMPLOYEE_TYPES_STYLE.netGuarantee,
  dashboardColor: EMPLOYEE_TYPES_COLOR.netGuarantee
};

export const sag = {
  index: 1,
  name: 'sag',
  label: 'SAG',
  value: 'SAG',
  icon: 'rate_reviewed',
  styleClass: EMPLOYEE_TYPES_STYLE.sag,
  dashboardColor: EMPLOYEE_TYPES_COLOR.sag
};

export const purchase = {
  index: 1,
  name: 'purchase',
  label: 'Purchase',
  value: 'purchase',
  icon: 'rate_reviewed',
  styleClass: EMPLOYEE_TYPES_STYLE.purchase,
  dashboardColor: EMPLOYEE_TYPES_COLOR.purchase
};

export const guarantee = {
  index: 1,
  name: 'guarantee',
  label: 'Guarantee',
  value: 'Guarantee',
  icon: 'rate_reviewed',
  styleClass: EMPLOYEE_TYPES_STYLE.guarantee,
  dashboardColor: EMPLOYEE_TYPES_COLOR.guarantee
};

export const inventory = {
  index: 1,
  name: 'inventory',
  label: 'Inventory',
  value: 'Inventory',
  icon: 'rate_reviewed',
  styleClass: EMPLOYEE_TYPES_STYLE.inventory,
  dashboardColor: EMPLOYEE_TYPES_COLOR.inventory
};

export const signed = {
  index: 1,
  name: 'signed',
  label: 'Signed',
  value: 'Signed',
  icon: 'rate_reviewed',
  styleClass: EMPLOYEE_TYPES_STYLE.signed,
  dashboardColor: EMPLOYEE_TYPES_COLOR.signed
};

export const unsigned = {
  index: 1,
  name: 'unsigned',
  label: 'Unsigned',
  value: 'Unsigned',
  icon: 'rate_reviewed',
  styleClass: EMPLOYEE_TYPES_STYLE.unsigned,
  dashboardColor: EMPLOYEE_TYPES_COLOR.unsigned
};

export const deleted = {
  index: 1,
  name: 'deleted',
  label: 'Deleted',
  value: 'Deleted',
  icon: 'rate_reviewed',
  styleClass: EMPLOYEE_TYPES_STYLE.deleted,
  dashboardColor: EMPLOYEE_TYPES_COLOR.deleted
};
