import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SandboxRoutes } from './sandbox-routes';

import { SandboxViewComponent } from './sandbox-view/sandbox-view.component';

const sandboxRoutes: any[] = [];
SandboxRoutes.forEach(route => {
  sandboxRoutes.push({
    path: route.path,
    component: route.component
  });
});

const routes: Routes = [
  { path: '', component: SandboxViewComponent, children: sandboxRoutes }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SandboxRoutingModule { }
