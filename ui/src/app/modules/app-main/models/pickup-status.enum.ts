const lookupMap = new Map<string, PickupStatus>();

export class PickupStatus {
  static readonly NewStatus = new PickupStatus('New', 'New');
  static readonly InProcessStatus = new PickupStatus('In Progress', 'InProgress');
  static readonly CompleteStatus = new PickupStatus('Complete', 'Complete');
  static readonly CancelStatus = new PickupStatus('Cancel', 'Cancel');


  static fromKey(key: string) {
    return lookupMap.get(key);
  }

  static getItemStatuses() {
    const retval: PickupStatus[] = [];
    lookupMap.forEach((value, key) => {
      retval.push(value);
    });

    return retval;
  }

  private constructor(readonly displayName: string, readonly status: string) {
    lookupMap.set(status, this);
  }
}
