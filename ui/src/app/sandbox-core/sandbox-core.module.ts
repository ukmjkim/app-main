import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SandboxCoreRoutingModule } from './sandbox-core-routing.module';

@NgModule({
    imports: [
      SandboxCoreRoutingModule
    ],
    declarations: [

    ],
    exports: [
        RouterModule
    ],
    providers: [
    ]
})
export class SandboxCoreModule { }
