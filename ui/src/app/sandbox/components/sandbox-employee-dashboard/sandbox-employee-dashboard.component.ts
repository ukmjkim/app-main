import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {AppPageBaseComponent} from '../app-page-base/app-page-base.component';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-sandbox-employee-dashboard',
  templateUrl: './sandbox-employee-dashboard.component.html',
  styleUrls: ['./sandbox-employee-dashboard.component.scss']
})
export class SandboxEmployeeDashboardComponent extends AppPageBaseComponent {
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
