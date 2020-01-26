const lookupMap = new Map<string, EmployeeDashboardContractType>();

export class EmployeeDashboardContractType {
  static readonly SagType = new EmployeeDashboardContractType('SAG', 'SAG');
  static readonly StraightType = new EmployeeDashboardContractType('Straight', 'Straight');
  static readonly GuaranteeType = new EmployeeDashboardContractType('Guarantee', 'Guarantee');
  static readonly NetGuaranteeType = new EmployeeDashboardContractType('Net Guarantee', 'Net Guarantee');
  static readonly PurchaseType = new EmployeeDashboardContractType('Purchase', 'Purchase');
  static readonly InventoryType = new EmployeeDashboardContractType('Inventory', 'Inventory');
  static readonly SignedType = new EmployeeDashboardContractType('Signed', 'Signed');
  static readonly UnsignedType = new EmployeeDashboardContractType('Unsigned', 'Unsigned');
  static readonly DeletedType = new EmployeeDashboardContractType('Deleted', 'Deleted');
  static readonly NoneType = new EmployeeDashboardContractType('None', 'None');


  static fromKey(key: string) {
    return lookupMap.get(key);
  }

  static getEmployeeDashboardContractType() {
    const retval: EmployeeDashboardContractType[] = [];
    lookupMap.forEach((value, key) => {
      retval.push(value);
    });

    return retval;
  }

  private constructor(readonly displayName: string, readonly status: string) {
    lookupMap.set(status, this);
  }
}
