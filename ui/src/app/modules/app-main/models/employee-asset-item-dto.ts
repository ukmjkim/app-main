export class EmployeeAssetItemDto {
  id: number;
  contractId: number;
  sellerId: number;
  auctionEventId: number;
  saleOwnerId: number;
  equipmentId?: number;
  description?: string;
  serialNumber?: string;
  lotNum?: string;
  scheduleA?: string;
  equipmentType?: string;
  odometer?: number;
  odometerTypeDesc?: string;
  shootPrice?: number;
  soldPrice?: number;
  saleType?: string;
  status?: string;

  constructor() {
    this.id = undefined;
    this.contractId = undefined;
    this.sellerId = undefined;
    this.auctionEventId = undefined;
    this.saleOwnerId = undefined;
    this.equipmentId = undefined;
    this.description = undefined;
    this.serialNumber = undefined;
    this.lotNum = undefined;
    this.scheduleA = undefined;
    this.equipmentType = undefined;
    this.odometer = undefined;
    this.odometerTypeDesc = undefined;
    this.shootPrice = undefined;
    this.soldPrice = undefined;
    this.saleType = undefined;
    this.status = undefined;
  }
}
