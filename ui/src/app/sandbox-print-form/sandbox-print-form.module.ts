import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppLibraryModules } from '../app-library-modules';
import { SandboxPrintFormRoutingModule } from './sandbox-print-form-routing.module';
import { SandboxPrintFormEmployeeComponent } from './components/sandbox-print-form-employee/sandbox-print-form-employee.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppLibraryModules,
    SandboxPrintFormRoutingModule
  ],
  declarations: [
    SandboxPrintFormEmployeeComponent
  ],
  providers: [

  ],
  entryComponents: [

  ],
  exports: [

  ]
})
export class SandboxPrintFormModule {
  static forRoot() {
    return {
      ngModule: SandboxPrintFormModule
    };
  }
}
