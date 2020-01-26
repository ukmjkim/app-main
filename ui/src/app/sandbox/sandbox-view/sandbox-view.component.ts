import { Component, OnInit } from '@angular/core';
import { SandboxRoutes } from '../sandbox-routes';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-sandbox-view',
  templateUrl: './sandbox-view.component.html',
  styleUrls: ['./sandbox-view.component.scss']
})
export class SandboxViewComponent implements OnInit {
  readonly routes = SandboxRoutes;

  constructor() { }

  ngOnInit() {
  }

}
