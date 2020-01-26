export class EmployeeCostItemDto {
  sellerCostDetailsId: number;
  feeId: number;
  contractId: number;
  costTypeId: number;
  auctionEventId: number;
  equipId?: number;
  equipDescription?: string;
  serialNumber?: string;
  lotNum?: string;
  scheduleA?: string;
  costSheetDescription?: string;
  quantity?: number;
  unitPrice?: number;
  unitOfMeasure?: string;
  amount?: number;
  comments?: string;
  purchaseOrderLineGUID?: string;
  purchaseOrderNumber?: number;

  constructor() {
    this.sellerCostDetailsId = undefined;
    this.feeId = undefined;
    this.contractId = undefined;
    this.costTypeId = undefined;
    this.auctionEventId = undefined;
    this.equipId = undefined;
    this.equipDescription = undefined;
    this.serialNumber = undefined;
    this.lotNum = undefined;
    this.scheduleA = undefined;
    this.costSheetDescription = undefined;
    this.quantity = undefined;
    this.unitPrice = undefined;
    this.unitOfMeasure = undefined;
    this.amount = undefined;
    this.comments = undefined;
    this.purchaseOrderLineGUID = undefined;
    this.purchaseOrderNumber = undefined;
  }
}
