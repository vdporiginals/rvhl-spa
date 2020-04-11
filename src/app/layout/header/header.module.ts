

import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    FlexLayoutModule,
    MatExpansionModule
  ],
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    FlexLayoutModule,
    MatExpansionModule
  ],
  providers: []
})
export class HeaderModule { }
