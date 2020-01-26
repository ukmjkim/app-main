import { AidJsonMappingUtil } from '@ukmjkim/aid-lib-services';
import { PickupSubItem } from './pickup-sub-item';
import { PickupHistory } from './pickup-history';

export class Pickup {
  purchaseOrderNumber?: number;
  purchaseOrderFormattedNumber?: string;
  purchaseOrderDate?: number;
  purchaseOrderGUID?: string;
  currency?: string;
  voided?: boolean;
  authorName?: string;
  authorId?: number;
  siteId?: number;
  localStatus?: string;
  serverStatus?: string;
  version?: number;
  supplierId?: number;
  supplierNumber?: string;
  supplierSiteId?: number;
  supplierName?: string;
  createdTS?: number;
  modifiedTS?: number;
  lastModifierId?: number;
  hasUnsubmittedChanges?: boolean;
  shipToSiteId?: number;
  invoiceToSiteId?: number;
  requestedByName?: string;
  requestedById?: number;
  firstApproverId?: number;
  firstApproverName?: string;
  returnStatus?: string;
  message?: string;
  totalOrdered?: number;
  totalReceived?: number;
  totalBilled?: number;
  totalNumberOfOrdered?: number;
  totalNumberOfReceived?: number;
  totalNumberOfBilled?: number;
  totalNumberOfNotes?: number;

  @AidJsonMappingUtil.deserializable(PickupSubItem) items?: PickupSubItem[];
  @AidJsonMappingUtil.deserializable(PickupHistory) history?: PickupHistory[];

  constructor() {
    this.purchaseOrderNumber = undefined;
    this.purchaseOrderFormattedNumber = undefined;
    this.purchaseOrderDate = undefined;
    this.purchaseOrderGUID = undefined;
    this.shipToSiteId = undefined;
    this.invoiceToSiteId = undefined;
    this.currency = undefined;
    this.voided = undefined;
    this.authorName = undefined;
    this.authorId = undefined;
    this.siteId = undefined;
    this.localStatus = undefined;
    this.serverStatus = undefined;
    this.requestedByName = undefined;
    this.requestedById = undefined;
    this.version = undefined;
    this.firstApproverId = undefined;
    this.firstApproverName = undefined;
    this.createdTS = undefined;
    this.modifiedTS = undefined;
    this.supplierId = undefined;
    this.supplierNumber = undefined;
    this.supplierSiteId = undefined;
    this.supplierName = undefined;
    this.history = undefined;
    this.totalOrdered = undefined;
    this.totalReceived = undefined;
    this.totalBilled = undefined;
    this.totalNumberOfOrdered = undefined;
    this.totalNumberOfReceived = undefined;
    this.totalNumberOfBilled = undefined;
    this.totalNumberOfNotes = undefined;
  }

  public static constructFromPickupJson(listJson): Pickup {
    let pickup = Object.assign(Pickup, listJson);
    return pickup;
  }
}

