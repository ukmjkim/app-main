import { Component, Input, Output, OnInit, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AidDialogService, AidLoggerService, AidGlobalConfig } from '@ukmjkim/aid-lib-services';
import { AppMainPermissionType } from '../../../models/app-main-permission-type.enum';
import { AppMainState } from '../../../models/app-main-state';
import { Employee } from '../../../models/employee';
import { EmployeeAuctionItemDto } from '../../../models/employee-auction-item-dto';

@Component({
    selector: 'aid-edit-employee-details',
    templateUrl: './edit-employee-details.component.html',
    styleUrls: ['./edit-employee-details.component.scss']
})
export class EditEmployeeDetailsComponent implements OnInit, OnChanges {

    @Input() id: string;
    @Input() appMainState: AppMainState;
    @Input() employee: Employee;
    @Input() employeeAuctionList: EmployeeAuctionItemDto[] = [];

    dateTimeFormat: string = AidGlobalConfig.dateTimeFormat;

    constructor(private dialog: MatDialog,
        private router: Router,
        private dialogService: AidDialogService,
        private logger: AidLoggerService) {
    }

    ngOnInit() {
        this.logger.info('EditEmployeeDetailsComponent', this.employeeAuctionList);
    }

    ngOnChanges(changes: SimpleChanges) {
      if (changes['employee']) {
        this.logger.info('EditEmployeeDetailsComponent', this.employeeAuctionList);
      }
      if (changes['employee']) {
        this.logger.info('EditEmployeeDetailsComponent', this.employeeAuctionList);
      }
    }

    goToSalesHub() {
      if (!this.employee || !this.employee.salesHubContractUrl) {
        return;
      }

      const finalURL = this.employee.salesHubContractUrl;
      window.open(finalURL, 'sales-hub', AidGlobalConfig.newWindowOptions);
    }


    public isWritable() {
      return this.appMainState.isAllowed(AppMainPermissionType.canManageEmployee);
    }
}
