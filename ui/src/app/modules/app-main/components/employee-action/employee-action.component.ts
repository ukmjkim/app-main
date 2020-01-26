import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { AidLoggerService, AidDialogService, AidMessageIndicatorService, AidIndicatorParams, AidUrlUtil, AidGlobalConfig } from '@ukmjkim/aid-lib-services';
import { AppMainPermissionType } from '../../models/app-main-permission-type.enum';
import { AppMainState } from '../../models/app-main-state';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';
import { EmployeeLinkType } from '../../constants/employee-link-type';

@Component({
    selector: 'aid-employee-action',
    templateUrl: './employee-action.component.html',
    styleUrls: ['./employee-action.component.scss']
})
export class EmployeeActionComponent implements OnInit, OnDestroy {

    @Input() appMainState: AppMainState;
    @Input() employee: Employee;

    private actionIndicatorSubscription: Subscription;

    constructor(
        private router: Router,
        private dialog: MatDialog,
        private logger: AidLoggerService,
        private dialogService: AidDialogService,
        private aidMessageIndicatorService: AidMessageIndicatorService,
        readonly employeeService: EmployeeService) {
        this.subscribeReloadIndicator();
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        if (this.actionIndicatorSubscription) this.actionIndicatorSubscription.unsubscribe();
    }

    // public openPurchaseOrderNotesDialog() {
    //     let dialogRef = this.dialog.open(PurchaseOrderNoteComponent, {
    //         width: '95vw',
    //         maxWidth: '95vw',
    //         data: {
    //             appMainState: this.appMainState
    //         }
    //     })
    //         .afterClosed()
    //         .subscribe(result => {
    //             if (result) {
    //                 this.purchaseOrderUpdated.emit(true);
    //             }
    //         });
    // }


    openEmployeeCostPrintForm() {
      const url = this.appMainState.linkSet.get(EmployeeLinkType.employeePrintForm.toString());

      const contractIds: number[] = [];
      contractIds.push(this.employee.contractId);

      let ids = contractIds.toString();
      ids = ids.replace('[', '').replace(']', '');

      const builder = AidUrlUtil.getInstance().getUrlBuilder(url);
      builder.setNamedParameter('ids', ids);
      const finalURL = builder.get();

      window.open(finalURL, 'print-form', AidGlobalConfig.newWindowOptions);
    }

    private returnToList() {
        const url = this.appMainState.linkSet.get(EmployeeLinkType.customerSearch.toString())

        const builder = AidUrlUtil.getInstance().getUrlBuilder(url);
        const finalURL = builder.get();
        this.router.navigate([finalURL]);
    }

    subscribeReloadIndicator() {
        this.actionIndicatorSubscription = this.aidMessageIndicatorService.announced$.subscribe((param: AidIndicatorParams) => {
            // this.selectedConfig = param.data;
            switch (param.type) {

            }
        })
    }

    public isReadable() {
        return this.appMainState.isAllowed(AppMainPermissionType.canViewEmployee);
    }

    public isWritable() {
        return this.appMainState.isAllowed(AppMainPermissionType.canManageEmployee);
    }
}
