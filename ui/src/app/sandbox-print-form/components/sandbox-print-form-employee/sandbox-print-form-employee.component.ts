import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {ContentDataType} from '@modules/app-main';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-sandbox-print-form-employee',
  templateUrl: './sandbox-print-form-employee.component.html',
  styleUrls: ['./sandbox-print-form-employee.component.scss']
})
export class SandboxPrintFormEmployeeComponent {

  ContentDataType = ContentDataType;

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected titleService: Title) {

  }
}
