import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppMaterialModule } from '../../app-material.module';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      AppMaterialModule,
      FlexLayoutModule,
      ],
      declarations: [

    ],
    exports: [

    ],
    entryComponents: [

    ]
})
export class CoreModule { }
