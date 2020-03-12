import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BlogsRoutingModule } from './blogs-routing.module';
import { MaterialModule } from '../material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { BlogDetailComponent } from './blog-list/blog-detail/blog-detail.component';
import { BlogFilterComponent } from './blog-filter/blog-filter.component';
import { BlogCommentComponent } from './blog-comment/blog-comment.component';
import { BlogBannerComponent } from './blog-banner/blog-banner.component';
import { BlogListComponent } from './blog-list/blog-list.component';

@NgModule({
  imports: [
    BlogsRoutingModule,
    CommonModule,
    MaterialModule,
    FontAwesomeModule
  ],
  declarations: [
    BlogDetailComponent,
    BlogFilterComponent,
    BlogCommentComponent,
    BlogBannerComponent,
    BlogListComponent
  ],
  exports: [
    MaterialModule,
    FontAwesomeModule,
    BlogDetailComponent,
    BlogFilterComponent,
    BlogCommentComponent,
    BlogBannerComponent,
    BlogListComponent
  ],
  providers: []
})
export class BlogsModule {}
