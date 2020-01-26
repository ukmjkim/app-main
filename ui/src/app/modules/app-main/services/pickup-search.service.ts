import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PickupSearchResultDto } from '../models/pickup-search-result-dto';
import { PickupSubItem } from '../models/pickup-sub-item';

@Injectable({
  providedIn: 'root'
})
export abstract class PickupSearchService {
  protected isUXOnly = false;

  public searchInSiteUrl = '/api/sites/:siteId/purchase-orders/search';
  public searchInEventUrl = '/api/auction-events/:eventId/purchase-orders/search';
  public findSearchRangeInSiteUrl = '/api/sites/:siteId/purchase-orders/max-min-values';
  public findSearchRangeInEventUrl = '/api/auction-events/:eventId/purchase-orders/max-min-values';
  public findEventRangeInSiteUrl = '/api/sites/:siteId/auto-complete-events/sale-number-key';
  public lineItemsUrl = '/api/sites/:siteId/purchase-orders/:orderNumber/line-items';
  public downloadInSiteUrl = '/api/sites/:siteId/purchase-orders/search/download';
  public downloadInEventUrl = '/api/auction-events/:eventId/purchase-orders/search/download';

  protected constructor() { }

  abstract setUXOnly(isUXOnly: boolean);
  abstract getPickupSearchById(siteId: number, eventId: number, searchQueryString: string): Observable<PickupSearchResultDto>;
  abstract getPickupSubItemsByOrderNumber(siteId: number, orderNumber: number): Observable<PickupSubItem[]>;

  abstract getPickupSearchRange(siteId: number, eventId: number): Observable<any[]>;
}
