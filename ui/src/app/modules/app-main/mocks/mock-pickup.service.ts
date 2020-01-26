import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { delay, map } from 'rxjs/operators';
import { AidLoggerService } from '@ukmjkim/aid-lib-services';
import { PickupService } from '../services/pickup.service';
import { Pickup } from '../models/pickup';
import { PickupCalendar } from '../models/pickup-calendar';
import { PICKUP_53_JSON_STRING } from './mock-pickup';
import { PICKUP_LIST_JSON_STRING } from './mock-pickup-search';
import { PICKUP_CALENDAR_JSON_STRING } from './mock-pickup-calendar';

@Injectable({
  providedIn: 'root'
})
export class MockPickupService extends PickupService {
  constructor(private logger: AidLoggerService) {
    super();
  }

  setUXOnly(isUXOnly: boolean) {
    this.isUXOnly = isUXOnly;
  }

  setCurrentPickup(pickup: Pickup): Observable<Pickup> {
    return of(Object.assign(new Pickup(), PICKUP_53_JSON_STRING))
      .pipe(
        delay(500),
        map(data => {
          return data;
        })
      );
  }

  getCurrentPickup(): Pickup {
    return Object.assign(new Pickup(), PICKUP_53_JSON_STRING);
  }

  getPickup(siteId: number, id: number): Observable<Pickup> {
    return of(Object.assign([], PICKUP_53_JSON_STRING))
      .pipe(
        delay(500),
        map(data => {
          return data;
        })
      );
  }

  getPickups(siteId: number, id: number) {
    return of(Object.assign([], PICKUP_LIST_JSON_STRING))
      .pipe(
        delay(500),
        map(data => {
          return data;
        })
      );
  }

  getPickupsForCalendar(): Observable<PickupCalendar[]> {
    return of(Object.assign([], PICKUP_CALENDAR_JSON_STRING))
      .pipe(
        delay(500),
        map(data => {
          return data;
        })
      );
  }}
