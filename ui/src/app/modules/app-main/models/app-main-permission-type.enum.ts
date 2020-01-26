const lookupMap = new Map<string, AppMainPermissionType>();

export class AppMainPermissionType {
  static readonly canViewEmployee = new AppMainPermissionType(
    'canViewEmployee'
  );
  static readonly canManageEmployee = new AppMainPermissionType(
    'canManageEmployee'
  );

  static fromKey(key: string) {
    return lookupMap.get(key);
  }

  static getAutoCompleteFields() {
    const retval: AppMainPermissionType[] = [];
    lookupMap.forEach((value, key) => {
      retval.push(value);
    });

    return retval;
  }

  private constructor(readonly type: string) {
    lookupMap.set(type, this);
  }
}
