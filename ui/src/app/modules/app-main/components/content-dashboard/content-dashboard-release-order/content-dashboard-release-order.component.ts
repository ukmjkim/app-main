import { Component, ViewEncapsulation, Input, Injector } from '@angular/core';
import { AppMainPermissionType } from '../../../models/app-main-permission-type.enum';
import { AppMainState } from '../../../models/app-main-state';
import { ContentDataType } from '../../../models/content-data-type.enum';

@Component({
  selector: 'aid-content-dashboard-release-order',
  templateUrl: './content-dashboard-release-order.component.html',
  styleUrls: ['./content-dashboard-release-order.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContentDashboardReleaseOrderComponent {
  @Input() id: string;

  chartOptions = {
    responsive: true
  };

  chartData = [
    { data: [330, 600, 260, 700], label: 'Dryer1' },
    { data: [120, 455, 100, 340], label: 'Dryer2' },
    { data: [45, 67, 800, 500], label: 'Dryer3' }
  ];

  chartLabels = ['Week-3', 'Week-2', 'Last Week', 'This Week'];

  onChartClick(event) {
    console.log(event);
  }
}
