import { PickupSubItem } from '../models/pickup-sub-item';

export class PickupRequest {
  purchaseOrderNumber?: number;
  currency?: string;
  siteId?: number;
  authorId?: number;
  supplierId?: number;
  supplierNumber?: string;
  supplierSiteId?: number;
  supplierName?: string;
  voided?: boolean;
  items?: PickupSubItem[];
}
