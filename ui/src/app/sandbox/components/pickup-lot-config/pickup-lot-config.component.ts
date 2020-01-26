import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {AppPageBaseComponent} from '../app-page-base/app-page-base.component';
import {ContentDataType} from '@modules/app-main';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-pickup-lot-config',
  templateUrl: './pickup-lot-config.component.html',
  styleUrls: ['./pickup-lot-config.component.scss']
})
export class PickupLotConfigComponent extends AppPageBaseComponent {

  ContentDataType = ContentDataType.ReleaseOrder;
  ContentDataTypeDisplayName = ContentDataType.ReleaseOrder.displayName;

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
