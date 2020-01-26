const lookupMap = new Map<string, ContentDataType>();

export class ContentDataType {
  static readonly Bag = new ContentDataType('bag', 'Bag', '/api/v1/bags', '/api/v1/bags/:id');
  static readonly Contact = new ContentDataType('contact', 'Contact', '/api/v1/contacts', '/api/v1/contacts/:id');
  static readonly DryerLog = new ContentDataType('dryer-log', 'Dryer Log', '/api/v1/dryer-logs', '/api/v1/dryer-logs/:id');
  static readonly Dryer = new ContentDataType('dryer', 'Dryer', '/api/v1/dryers', '/api/v1/dryers/:id');
  static readonly DryingOrder = new ContentDataType('drying-order', 'Drying Order', '/api/v1/drying-orders', '/api/v1/drying-orders/:id');
  static readonly DryingOrderBag = new ContentDataType('drying-order-bag', 'Drying Order Bag', '/api/v1/drying-orders/:id/bags', '/api/v1/drying-orders/:id/bags');
  static readonly Employee = new ContentDataType('employee', 'Employee', '/api/v1/employees', '/api/v1/employees/:id');
  static readonly Farm = new ContentDataType('farm', 'Farm', '/api/v1/farms', '/api/v1/farms/:id');
  static readonly ReleaseOrderBag = new ContentDataType('release-order-bag', 'Release Order Bag', '/api/v1/release-order-bags', '/api/v1/release-order-bags/:id');
  static readonly ReleaseOrder = new ContentDataType('release-order', 'Release Order', '/api/v1/release-orders', '/api/v1/release-orders/:id');
  static readonly Role = new ContentDataType('role', 'Role', '/api/v1/roles', '/api/v1/roles/:id');
  static readonly TestingCOALog = new ContentDataType('testing-coa-log', 'Testing COA Log', '/api/v1/testing-coa-logs', '/api/v1/testing-coa-logs/:id');
  static readonly WorkHour = new ContentDataType('work-hour', 'Work Hour', '/api/v1/work-hours', '/api/v1/work-hours/:id');
  static readonly WorkShift = new ContentDataType('work-shift', 'Work Shift', '/api/v1/work-shifts', '/api/v1/work-shifts/:id');

  static fromKey(key: string) {
    return lookupMap.get(key);
  }

  static getContentDataType() {
    const retval: ContentDataType[] = [];
    lookupMap.forEach((value, key) => {
      retval.push(value);
    });

    return retval;
  }

  private constructor(readonly key: string, readonly displayName: string, readonly getOrPostUrl: string, readonly putOrDeleteUrl: string) {
    lookupMap.set(key, this);
  }
}
