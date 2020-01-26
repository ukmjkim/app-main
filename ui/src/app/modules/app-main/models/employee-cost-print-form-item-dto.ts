export class EmployeeCostPrintFormItemDto {
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

  constructor() {
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
  }
}
