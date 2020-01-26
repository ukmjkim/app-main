import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {AppPageBaseComponent} from '../app-page-base/app-page-base.component';
import {ContentDataType} from '@modules/app-main';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-bag-list',
  templateUrl: './bag-list.component.html',
  styleUrls: ['./bag-list.component.scss']
})
export class BagListComponent extends AppPageBaseComponent {

  ContentDataType = ContentDataType.Bag;
  ContentDataTypeDisplayName = ContentDataType.Bag.displayName;

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
