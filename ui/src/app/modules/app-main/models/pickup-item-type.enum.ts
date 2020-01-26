const lookupMap = new Map<string, PickupItemType>();

export class PickupItemType {
  static readonly SellerExpense = new PickupItemType('Seller Expense', 'B', 'Seller');
  static readonly BuyerExpense = new PickupItemType('Buyer Expense', 'G', 'Buyer');
  static readonly DirectExpense = new PickupItemType('Direct Expense', 'A', 'Direct');
  static readonly OverheadExpense = new PickupItemType('Overhead Expense', 'J', 'Overhead');
  static readonly OtherInventoryControlExpense = new PickupItemType('Other - Inventory Control', 'C', 'IC');

  static fromLineTypeCode(lineTypeCode: string) {
    return lookupMap.get(lineTypeCode);
  }

  static getLineItemTypes() {
    const retval: PickupItemType[] = [];
    lookupMap.forEach((value, key) => {
      retval.push(value);
    });

    return retval;
  }

  private constructor(readonly displayName: string, readonly lineTypeCode: string, readonly shortDisplayName: string) {
    lookupMap.set(lineTypeCode, this);
  }
}
