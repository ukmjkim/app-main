import { Component, ViewEncapsulation, Input, Injector } from '@angular/core';
import { AppMainPermissionType } from '../../models/app-main-permission-type.enum';
import { AppMainState } from '../../models/app-main-state';
import { ContentDataType } from '../../models/content-data-type.enum';

@Component({
  selector: 'aid-content-dashboard',
  templateUrl: './content-dashboard.component.html',
  styleUrls: ['./content-dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContentDashboardComponent {

  @Input() id: string;
  @Input() contentDataType: ContentDataType;
  @Input() appInjector: Injector;
  @Input() appMainState: AppMainState;
  @Input() pageTitle: string;
  @Input() pageInfo: string;

  chartOptions = {
    responsive: true
  };

  chartData = [
    { data: [330, 600, 260, 700], label: 'Account A' },
    { data: [120, 455, 100, 340], label: 'Account B' },
    { data: [45, 67, 800, 500], label: 'Account C' }
  ];

  chartLabels = ['January', 'February', 'Mars', 'April'];

  onChartClick(event) {
    console.log(event);
  }
}
