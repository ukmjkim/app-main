import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { delay, map } from 'rxjs/operators';
import { AidLoggerService } from '@ukmjkim/aid-lib-services';
import { PickupDashboardStatsService } from '../services/pickup-dashboard-stats.service';
import { PickupDashboardIssueStat } from '../models/pickup-dashboard-issue-stat';
import { PICKUP_DASHBOARD_STATS_JSON_STRING, PICKUP_DASHBOARD_ISSUE_STATS_JSON_STRING } from './mock-pickup-dashboard-stats';

@Injectable({
  providedIn: 'root'
})
export class MockPickupDashboardStatsService extends PickupDashboardStatsService {
    constructor(private logger: AidLoggerService) {
      super();
    }

    setUXOnly(isUXOnly: boolean) {
      this.isUXOnly = isUXOnly;
    }

    getPickupStats(eventId: number): Observable<any[]> {
      return of(Object.assign([], PICKUP_DASHBOARD_STATS_JSON_STRING))
      .pipe(
        delay(500),
        map(data => {
          return data;
        })
      );
    }

    getPickupIssueStats(siteId: number, eventId: number): Observable<PickupDashboardIssueStat> {
      return of(Object.assign([], PICKUP_DASHBOARD_ISSUE_STATS_JSON_STRING))
      .pipe(
        delay(500),
        map(data => {
          return data;
        })
      );
    }
}
