import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ShortNumberPipe } from './short-num.pipe';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    ShortNumberPipe
  ],
  exports: [
    ShortNumberPipe
  ],
})
export class PipeModule { }
