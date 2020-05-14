import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ShortNumberPipe } from './short-num.pipe';
import { TextOverflowPipe } from './text-overflow.pipe';
import { SanitizeHtmlPipe } from './sanitize-html.pipe';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    ShortNumberPipe,
    TextOverflowPipe,
    SanitizeHtmlPipe
  ],
  exports: [
    ShortNumberPipe,
    TextOverflowPipe,
    SanitizeHtmlPipe
  ],
})
export class PipeModule { }
