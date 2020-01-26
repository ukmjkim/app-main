import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {AppPageBaseComponent} from '../app-page-base/app-page-base.component';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-sandbox-edit-employee',
  templateUrl: './sandbox-edit-employee.component.html',
  styleUrls: ['./sandbox-edit-employee.component.scss']
})
export class SandboxEditEmployeeComponent extends AppPageBaseComponent {
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
