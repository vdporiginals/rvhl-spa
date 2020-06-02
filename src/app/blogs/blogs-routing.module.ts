import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { BlogPostResolve } from './blog-detail/blog-post.resolver';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogResolve } from './blog.resolver';
import { BlogsComponent } from './blogs.component';
const routes: Routes = [
  {
    path: '',
    component: BlogsComponent,
    children: [
      {
        path: '',
        component: BlogListComponent,
        pathMatch: 'full',
        resolve: {
          blogCategory: BlogResolve
        },
        data: {
          queryBanner: 'SchedulePage',
          breadcrumb: 'Lịch trình',
          position: 'Schedule'
        },
      },
      {
        path: ':id/:seo',
        pathMatch: 'full',
        component: BlogDetailComponent,
        data: { breadcrumb: '' },
        resolve: {
          blogpost: BlogPostResolve
        },
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [BlogPostResolve, BlogResolve]
})
export class BlogsRoutingModule { }
