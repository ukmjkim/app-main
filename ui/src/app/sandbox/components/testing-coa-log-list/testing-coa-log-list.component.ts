import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {AppPageBaseComponent} from '../app-page-base/app-page-base.component';
import {ContentDataType} from '@modules/app-main';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-testing-coa-log-list',
  templateUrl: './testing-coa-log-list.component.html',
  styleUrls: ['./testing-coa-log-list.component.scss']
})
export class TestingCOALogListComponent extends AppPageBaseComponent {

  ContentDataType = ContentDataType.TestingCOALog;
  ContentDataTypeDisplayName = ContentDataType.TestingCOALog.displayName;

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected titleService: Title) {
    super(router, route, titleService);
  }

  setPermissionTypes(): Map<string, boolean> {
    return this.setPermissionTypesForEmployee();
  }

  setLinks(): Map<string, string> {
    return super.setLinksForEmployee();
  }
}
