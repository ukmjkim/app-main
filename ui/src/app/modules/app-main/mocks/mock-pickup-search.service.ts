import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { delay, map } from 'rxjs/operators';
import { AidLoggerService } from '@ukmjkim/aid-lib-services';
import { PickupSearchService } from '../services/pickup-search.service';
import { PickupSearchResultDto } from '../models/pickup-search-result-dto';
import { PickupSubItem } from '../models/pickup-sub-item';
import { Pickup } from '../models/pickup';
import { PICKUP_53_JSON_STRING } from './mock-pickup';
import { PICKUP_LIST_JSON_STRING } from './mock-pickup-search';
import { PICKUP_SEARCH_JSON_STRING } from './mock-pickup-search-result';

@Injectable({
  providedIn: 'root'
})
export class MockPickupSearchService extends PickupSearchService {
  constructor(private logger: AidLoggerService) {
    super();
  }

  setUXOnly(isUXOnly: boolean) {
    this.isUXOnly = isUXOnly;
  }

  getPickupSearchById(siteId: number, eventId: number, searchQueryString: string): Observable<PickupSearchResultDto> {
    return of(Object.assign(new PickupSearchResultDto, PICKUP_SEARCH_JSON_STRING))
      .pipe(
        delay(500),
        map(data => {
          console.log('getPickupSearchById', data);
          return data;
        })
      );
  }

  getPickupSubItemsByOrderNumber(siteId: number, orderNumber: number): Observable<PickupSubItem[]> {
    return of(Object.assign([], PICKUP_LIST_JSON_STRING))
      .pipe(
        delay(500),
        map(data => {
          return data;
        })
      );
  }

  getPickupSearchRange(siteId: number, eventId: number): Observable<any[]> {
    return of(Object.assign([], PICKUP_LIST_JSON_STRING))
    .pipe(
      delay(500),
      map(data => {
        return data;
      })
    );
  }
}
