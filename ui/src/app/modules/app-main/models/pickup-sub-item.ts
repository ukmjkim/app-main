export class PickupSubItem {
  equipId?: number;
  lotNumber?: number;
  assetDescription?: string;
  buyerFullName?: number;
  buyerPhone?: number;
  buyerEmail?: string;
  bidderNumber?: number;
  issue?: string;

  constructor() {
    this.equipId = undefined;
    this.lotNumber = undefined;
    this.assetDescription = undefined;
    this.buyerFullName = undefined;
    this.buyerPhone = undefined;
    this.buyerEmail = undefined;
    this.bidderNumber = undefined;
    this.issue = undefined;
  }
}
