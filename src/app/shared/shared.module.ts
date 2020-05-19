import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { BreadcrumbComponent } from '../layout/breadcrumb/breadcrumb.component';
import { AppShellRenderDirective, AppShellNoRenderDirective } from './directives/app-shell.directive';
import { OnlyNumberDirective } from './directives/only-num.directive';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    FlexLayoutModule.withConfig({ ssrObserveBreakpoints: ['xs', 'lt-md'] })
  ],
  exports: [
    FlexLayoutModule,
    BreadcrumbComponent,
    AppShellRenderDirective,
    AppShellNoRenderDirective,
    OnlyNumberDirective
  ],
  declarations: [
    BreadcrumbComponent,
    AppShellRenderDirective,
    AppShellNoRenderDirective,
    OnlyNumberDirective
  ],
})
export class SharedModule { }

