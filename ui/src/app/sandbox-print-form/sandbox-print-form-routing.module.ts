import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeePrintFormComponent } from '../modules/app-main/components/employee-print-form/employee-print-form.component';

const routes: Routes = [
  { path: 'sites/:siteId/events/:eventId/seller-costs/contracts/:ids', component: EmployeePrintFormComponent }
];

@NgModule({
    imports: [ RouterModule.forChild(routes)],
    exports: [ RouterModule ]
})
export class SandboxPrintFormRoutingModule {}
