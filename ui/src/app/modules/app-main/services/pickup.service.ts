import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Pickup } from '../models/pickup';
import { PickupCalendar } from '../models/pickup-calendar';
import { PickupRequest } from '../models/pickup-request';
import { PickupResponse } from '../models/pickup-response';
import { PickupServiceResponse } from '../models/pickup-service-response';
import {
    poNew,
    poOpen,
    poQueued,
    poInProcess,
    poApproved,
    poRejected,
    poClosed,
    poClosedFinal,
    poVoid,
    poReceived,
    poPartiallyReceived,
    poNotReceived
} from '../constants/pickup-state';

@Injectable({
    providedIn: 'root'
})
export abstract class PickupService {
    protected isUXOnly = false;

    getPickupsCallback = new Subject<Pickup[]>();

    abstract setUXOnly(isUXOnly: boolean);
    abstract setCurrentPickup(pickup: Pickup);
    abstract getCurrentPickup(): Pickup;

    abstract getPickup(siteId: number, id: number): Observable<Pickup>;
    abstract getPickups(siteId: number, eventId: number);
    abstract getPickupsForCalendar(): Observable<PickupCalendar[]>;

    statusColor(status: string, voided: boolean) {
        let formattedStatus = 'grey';
        if (status && status !== undefined) {
            switch (status.toUpperCase()) {
                case 'SUBMITTED':
                case 'IN PROCESS':
                    formattedStatus = poInProcess.styleClass;
                    break;
                case 'NEW':
                    formattedStatus = poNew.styleClass;
                    break;
                case 'OPEN':
                    formattedStatus = poOpen.styleClass;
                    break;
                case 'APPROVED':
                    formattedStatus = poApproved.styleClass;
                    break;
                case 'REJECTED':
                    formattedStatus = poRejected.styleClass;
                    break;
                case 'CLOSED':
                    formattedStatus = poClosed.styleClass;
                    break;
                case 'CLOSED FINAL':
                    formattedStatus = poClosedFinal.styleClass;
                    break;
                case 'VOID':
                    formattedStatus = poVoid.styleClass;
                    break;
                case '-':
                    formattedStatus = 'hidden';
                    break;
            }
        } else {
            formattedStatus = 'hidden';
        }

        return voided ? 's-grey' : 's-' + formattedStatus;
    }


    receivedColor(status: string) {
        let formattedStatus = 'green';
        if (status) {
            switch (status.toUpperCase()) {
                case 'RECEIVED':
                    formattedStatus = poReceived.styleClass;
                    break;
                case 'PARTIALLY RECEIVED':
                    formattedStatus = poPartiallyReceived.styleClass;
                    break;
                case 'NOT RECEIVED':
                    formattedStatus = poNotReceived.styleClass;
                    break;
            }
        } else {
            formattedStatus = 'hidden';
        }

        return 's-' + formattedStatus;
    }
}
