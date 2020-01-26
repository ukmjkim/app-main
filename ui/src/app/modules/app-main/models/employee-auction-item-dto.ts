export class EmployeeAuctionItemDto {
  contractId: number;
  auctionEventId: number;
  saleOwnerId: number;
  eventName: string;
  saleNumber: string;
  saleDate: number;
  totalAssets: number;
  totalShootPrice: number;

  constructor() {
    this.contractId = undefined;
    this.auctionEventId = undefined;
    this.saleOwnerId = undefined;
    this.eventName = undefined;
    this.saleNumber = undefined;
    this.saleDate = undefined;
    this.totalAssets = undefined;
    this.totalShootPrice = undefined;
  }
}
