import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PickupDashboardIssueStat } from '../models/pickup-dashboard-issue-stat';

@Injectable({
    providedIn: 'root'
})
export abstract class PickupDashboardStatsService {
    protected isUXOnly = false;

    public purchaseOrderStatsHeader = '/api/auction-events/:eventId/purchase-order/overview';
    public purchaseOrderStatsLine = '/api/auction-events/:eventId/purchase-order/line-item/overview';
    public purchaseOrderIssueStats = '/api/sites/:siteId/auction-events/:eventId/purchase-order/issue/overview';

    protected constructor() { }

    abstract setUXOnly(isUXOnly: boolean);
    abstract getPickupStats(eventId: number): Observable<any[]>;
    abstract getPickupIssueStats(siteId: number, eventId: number): Observable<PickupDashboardIssueStat>;
}
