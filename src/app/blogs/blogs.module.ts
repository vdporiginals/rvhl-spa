import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogsRoutingModule } from './blogs-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NgxPaginationModule } from 'ngx-pagination';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FlexLayoutModule } from '@angular/flex-layout';

import { BlogsComponent } from './blogs.component';
import { BlogBannerComponent } from './blog-banner/blog-banner.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogCommentComponent } from './blog-comment/blog-comment.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { BlogFilterComponent } from './blog-filter/blog-filter.component';

@NgModule({
  imports: [
    BlogsRoutingModule,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    FontAwesomeModule,
    NgxPaginationModule,
    FlexLayoutModule
  ],
  exports: [
    NgxPaginationModule,
    FontAwesomeModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule
  ],
  declarations: [
    BlogsComponent,
    BlogBannerComponent,
    BlogListComponent,
    BlogCommentComponent,
    BlogDetailComponent,
    BlogFilterComponent
  ],
  providers: []
})
export class BlogsModule { }
