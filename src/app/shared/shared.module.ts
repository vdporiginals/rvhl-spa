import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { BreadcrumbComponent } from '../layout/breadcrumb/breadcrumb.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
  ],
  exports: [
    FlexLayoutModule,
    BreadcrumbComponent,
  ],
  declarations: [
    BreadcrumbComponent,
  ],
})
export class SharedModule { }
