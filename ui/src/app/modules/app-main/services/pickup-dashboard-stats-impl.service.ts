import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { AidLoggerService, AidHttpOptions } from '@ukmjkim/aid-lib-services';
import { PickupDashboardStatsService } from './pickup-dashboard-stats.service';
import { PickupDashboardIssueStat } from '../models/pickup-dashboard-issue-stat';
import { MockPickupDashboardStatsService } from '../mocks/mock-pickup-dashboard-stats.service';

@Injectable({
    providedIn: 'root'
})
export class PickupDashboardStatsServiceImpl extends PickupDashboardStatsService {

    constructor(private http: HttpClient, private logger: AidLoggerService) {
        super();
    }

    setUXOnly(isUXOnly: boolean) {
      this.isUXOnly = isUXOnly;
    }

    getPickupStats(eventId: number): Observable<any[]> {
        if (this.isUXOnly) {
          return new MockPickupDashboardStatsService(this.logger).getPickupStats(eventId);
        }

        const statHeaderUri = this.purchaseOrderStatsHeader.replace(':eventId', String(eventId));
        const statLineUri = this.purchaseOrderStatsLine.replace(':eventId', String(eventId));

        const statHeaderUriHttp = this.http.get(statHeaderUri, AidHttpOptions.json());
        const statLineUriHttp = this.http.get(statLineUri, AidHttpOptions.json());

        return forkJoin([statHeaderUriHttp, statLineUriHttp]);
    }

    getPickupIssueStats(siteId: number, eventId: number): Observable<PickupDashboardIssueStat> {
        if (this.isUXOnly) {
          return new MockPickupDashboardStatsService(this.logger).getPickupIssueStats(siteId, eventId);
        }

        const statUri = this.purchaseOrderIssueStats.replace(':siteId', String(siteId)).replace(':eventId', String(eventId));

        return this.http.get(statUri)
            .pipe(
                map(json => Object.assign(new PickupDashboardIssueStat(), json))
            );
    }
}
