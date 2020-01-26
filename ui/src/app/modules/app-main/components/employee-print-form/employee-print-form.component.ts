import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AidLoggerService, AidGlobalConfig, AidDateFormatPipe } from '@ukmjkim/aid-lib-services';
import { AppMainPermissionType } from '../../models/app-main-permission-type.enum';
import { AppMainState } from '../../models/app-main-state';
import { EmployeeCostPrintFormDto } from '../../models/employee-cost-print-form-dto';
import { EmployeeCostPrintFormService } from '../../services/employee-cost-print-form.service';


@Component({
  selector: 'aid-employee-print-form',
  templateUrl: './employee-print-form.component.html',
  styleUrls: ['./employee-print-form.component.scss']
})
export class EmployeePrintFormComponent implements OnInit {
  public siteId: number;
  public eventId: number;
  public ids: number[];
  public today: string;
  public userName: string;
  public dateFormat = AidGlobalConfig.dateFormat;
  public dateTimeFormat = AidGlobalConfig.dateTimeFormat;

  public sellerCostPrintForm: EmployeeCostPrintFormDto;
  public sellerCostPrintFormList: Array<EmployeeCostPrintFormDto>;

  private activatedRouteSubscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute,
    private logger: AidLoggerService,
    private employeeCostPrintFormService: EmployeeCostPrintFormService) {
    const dateFormatPipe = new AidDateFormatPipe();
    this.today = dateFormatPipe.transform(Date.now());
    this.subscribeActivatedRouteParamsChanged();
  }

  ngOnInit() {
    this.logger.info('EmployeePrintFormComponent > ngOnInit');
  }

  private loadData() {
    this.logger.info('EmployeePrintFormComponent > loadData');
    this.employeeCostPrintFormService.getEmployeeCostPrintFormData(this.ids).subscribe(sellerCostPrints => {
      this.logger.info('EmployeePrintFormComponent > getEmployeeCostPrintFormData');
      this.sellerCostPrintFormList = sellerCostPrints;
      this.logger.info('loadData', this.sellerCostPrintFormList);
      if (this.sellerCostPrintFormList.length > 0) {
        this.sellerCostPrintForm = this.sellerCostPrintFormList[0];
      }
      this.logger.info(this.sellerCostPrintForm);
    });
  }

  private subscribeActivatedRouteParamsChanged() {
    this.activatedRouteSubscription = this.activatedRoute.params.subscribe(params => {
      const ids = params['ids'] ? params['ids'] : '';
      if (ids.length > 0) {
        this.ids = ids.split(',').map(Number);
      }
      this.loadData();
    });
  }

  print() {
    window.print();
  }
}
