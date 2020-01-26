import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'app-main', pathMatch: 'full'},
  {path: 'app-main', loadChildren: () => import('../sandbox/sandbox.module').then(m => m.SandboxModule)},
  {path: 'print-form', loadChildren: () => import('../sandbox-print-form/sandbox-print-form.module').then(m => m.SandboxPrintFormModule)},
  // {path: 'app-main', loadChildren: '../sandbox/sandbox.module#SandboxModule'},
  // {path: 'print-form', loadChildren: '../sandbox-print-form/sandbox-print-form.module#SandboxPrintFormModule'},
];

@NgModule({
//  imports: [RouterModule.forRoot(routes, {useHash: true, enableTracing: true})],
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class SandboxCoreRoutingModule {
}
