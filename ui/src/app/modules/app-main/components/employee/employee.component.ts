import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { AidGlobalConfig, AidDialogService, AidLoggerService, AidMessageIndicatorService, AidIndicatorParams, AidUrlUtil } from '@ukmjkim/aid-lib-services';
import { AppMainPermissionType } from '../../models/app-main-permission-type.enum';
import { AppMainState } from '../../models/app-main-state';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';
import { EmployeeLinkType } from '../../constants/employee-link-type';

@Component({
    selector: 'aid-employee',
    templateUrl: './employee.component.html',
    styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit, OnDestroy, OnChanges {

    @Input() id: string;
    @Input() appMainState: AppMainState;

    public AppMainPermissionType: AppMainPermissionType;

    public siteId: number;
    public eventId: number;
    public editingSalesOrder = false;
    public selectedItemList: Employee[] = [];

    dateTimeFormat: string = AidGlobalConfig.dateTimeFormat;

    private actionIndicatorSubscription: Subscription;

    constructor(private router: Router,
        private dialog: MatDialog,
        private dialogService: AidDialogService,
        private logger: AidLoggerService,
        private aidMessageIndicatorService: AidMessageIndicatorService,
        private employeeService: EmployeeService) {

    }

    ngOnInit() {
      this.employeeService.setUXOnly(this.appMainState.isUXOnly);
    }

    ngOnChanges(changes: SimpleChanges) {
      if (changes['AppMainState']) {
        this.employeeService.setUXOnly(this.appMainState.isUXOnly);
      }
    }

    ngOnDestroy() {
        if (this.actionIndicatorSubscription) {
          this.actionIndicatorSubscription.unsubscribe();
        }
    }

    public onSelected(selectedItemList: Employee[]) {
      this.selectedItemList = selectedItemList;
    }

    public addSellerContract() {
        this.router.navigateByUrl(this.getGoToLink());
    }


    openContractConfidentialChange() {

    }

    openSellerCostPrintForm() {
      const url = this.appMainState.linkSet.get(EmployeeLinkType.employeePrintForm.toString());

      const contractIds: number[] = [];
      this.selectedItemList.forEach(item => {
        contractIds.push(item.contractId);
      });

      let ids = contractIds.toString();
      ids = ids.replace('[', '').replace(']', '');

      const builder = AidUrlUtil.getInstance().getUrlBuilder(url);
      builder.setNamedParameter('ids', ids);
      const finalURL = builder.get();

      window.open(finalURL, 'print-form', AidGlobalConfig.newWindowOptions);
    }

    getGoToLink() {
        return this.appMainState.linkSet.get(EmployeeLinkType.employeeDetail.toString());
    }

    private announceReload() {
        const param: AidIndicatorParams = { type: EmployeeLinkType.employeeReload.toString(), data: { salesOrder: null } };
        this.aidMessageIndicatorService.announce(param);
    }

    public isReadable() {
      return this.appMainState.isAllowed(AppMainPermissionType.canViewEmployee);
    }

    public isWritable() {
      return this.appMainState.isAllowed(AppMainPermissionType.canManageEmployee);
    }
}
