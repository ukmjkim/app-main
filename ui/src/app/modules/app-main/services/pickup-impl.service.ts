import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { AidLoggerService, AidJsonMappingUtil, AidHttpOptions } from '@ukmjkim/aid-lib-services';
import { PickupService } from './pickup.service';
import { MockPickupService } from '../mocks/mock-pickup.service';
import { Pickup } from '../models/pickup';
import { PickupCalendar } from '../models/pickup-calendar';
import { PickupSubItem } from '../models/pickup-sub-item';
import { PickupRequest } from '../models/pickup-request';
import { PickupResponse } from '../models/pickup-response';
import { PickupServiceResponse } from '../models/pickup-service-response';

@Injectable({
  providedIn: 'root'
})
export class PickupServiceImpl extends PickupService {
  private currentPickup: Pickup;

  constructor(private http: HttpClient, private logger: AidLoggerService) {
    super();
  }

  private baseOrderUrl = '/api/sites/:siteId/pickups';
  private correctPickupReceiptsUrl = '/api/sites/:siteId/pickups/:purchaseOrderNumber/lines/:lineId/receipts/correction';
  private searchUrl = this.baseOrderUrl + '/search';
  private optionsUrl = this.baseOrderUrl + '/options';
  private pickupCalendarUrl = 'http://wlt030051:8080/api/v2/app';

  setUXOnly(isUXOnly: boolean) {
    this.isUXOnly = isUXOnly;
  }

  setCurrentPickup(purchaseOrder: Pickup) {
    this.currentPickup = purchaseOrder;
  }

  getCurrentPickup(): Pickup {
    return this.currentPickup;
  }

  public getPickup(siteId: number, id: number): Observable<Pickup> {
    if (this.isUXOnly) {
      return new MockPickupService(this.logger).getPickup(siteId, id);
    }

    const url = this.baseOrderUrl.replace(':siteId', String(siteId));
    return this.http.get(url + '/' + id)
      .pipe(
        map(json => Pickup.constructFromPickupJson(json))
      );
  }

  public getPickups(siteId: number, eventId: number) {
    let searchParams: string[] = [];
    (siteId !== undefined) && searchParams.push('siteIds=' + siteId);
    (eventId !== undefined) && searchParams.push('eventIds=' + eventId);

    const url = this.searchUrl + '?' + searchParams.join('&');

    this.http.get(url, AidHttpOptions.json())
      .pipe(
        tap(() => this.logger.info('RbaPickupService > getPickups - pickups loaded from server')),
        map(jsonArray => AidJsonMappingUtil.deserialize(Pickup, jsonArray)),
        catchError((err: any, caught: Observable<Pickup[]>) => {
          return Observable.throw(err);
        })
      )
      .subscribe(response => {
        this.logger.info('RbaPickupService > getPickups - pickup data has been fetched');
        this.getPickupsCallback.next(response);
      });
  }

  public getPickupsForCalendar(): Observable<PickupCalendar[]> {
    // if (this.isUXOnly) {
    //   return new MockPickupService(this.logger).getPickupsForCalendar();
    // }

    const url = this.pickupCalendarUrl;
    return this.http.get(url)
      .pipe(
        map(json => Object.assign([], json))
      );
  }
}
