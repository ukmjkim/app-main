const lookupMap = new Map<string, EmployeeStatus>();

export class EmployeeStatus {
  static readonly UnsignedStatus = new EmployeeStatus('Unsigned', 'Unsigned');
  static readonly DeletedStatus = new EmployeeStatus('Deleted', 'Deleted');
  static readonly SignedStatus = new EmployeeStatus('Signed', 'Signed');


  static fromKey(key: string) {
    return lookupMap.get(key);
  }

  static getEmployeeStatus() {
    const retval: EmployeeStatus[] = [];
    lookupMap.forEach((value, key) => {
      retval.push(value);
    });

    return retval;
  }

  private constructor(readonly displayName: string, readonly status: string) {
    lookupMap.set(status, this);
  }
}
