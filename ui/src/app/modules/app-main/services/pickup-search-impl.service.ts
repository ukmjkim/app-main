import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { AidHttpOptions, AidLoggerService } from '@ukmjkim/aid-lib-services';
import { PickupSearchService } from './pickup-search.service';
import { PickupSearchResultDto } from '../models/pickup-search-result-dto';
import { PickupSubItem } from '../models/pickup-sub-item';
import { MockPickupSearchService } from '../mocks/mock-pickup-search.service';

@Injectable({
    providedIn: 'root'
})
export class PickupSearchServiceImpl extends PickupSearchService {

    protected isUXOnly = false;

    constructor(private http: HttpClient, private logger: AidLoggerService) {
        super();
    }

    setUXOnly(isUXOnly: boolean) {
      this.isUXOnly = isUXOnly;
    }

    getPickupSearchById(siteId: number, eventId: number, searchQueryString: string): Observable<PickupSearchResultDto> {
        if (this.isUXOnly) {
          return new MockPickupSearchService(this.logger).getPickupSearchById(siteId, eventId, searchQueryString);
        }
        let searchUri = this.searchInSiteUrl.replace(':siteId', String(siteId));
        if (eventId) {
            searchUri = this.searchInEventUrl.replace(':eventId', String(eventId));
        }
        const body = searchQueryString;

        return this.http.post<PickupSearchResultDto>(searchUri, body, AidHttpOptions.json());
    }

    getPickupSubItemsByOrderNumber(siteId: number, orderNumber: number): Observable<PickupSubItem[]> {
        if (this.isUXOnly) {
          return new MockPickupSearchService(this.logger).getPickupSubItemsByOrderNumber(siteId, orderNumber);
        }

        let searchUri = this.lineItemsUrl.replace(':siteId', String(siteId)).replace(':orderNumber', String(orderNumber));
        const body = '';

        return this.http.get(searchUri)
            .pipe(
                map((lineItems: any[]) => lineItems.map(lineItem => Object.assign(new PickupSubItem(), lineItem))),
                catchError((err: any, caught: Observable<PickupSubItem[]>) => {
                    return Observable.throw(err);
                })
            );
    }

    getPickupSearchRange(siteId: number, eventId: number): Observable<any[]> {
        if (this.isUXOnly) {
          return new MockPickupSearchService(this.logger).getPickupSearchRange(siteId, eventId);
        }

        let searchUri = this.findSearchRangeInSiteUrl.replace(':siteId', String(siteId));
        if (eventId) {
            searchUri = this.findSearchRangeInEventUrl.replace(':eventId', String(eventId));
        }
        const searchEventUri = this.findEventRangeInSiteUrl.replace(':siteId', siteId.toString());

        const maxMinValueUrlHttp = this.http.get(searchUri, AidHttpOptions.json());
        const eventListUrlHttp = this.http.get(searchEventUri, AidHttpOptions.json());

        return forkJoin([maxMinValueUrlHttp, eventListUrlHttp]);
    }
}
