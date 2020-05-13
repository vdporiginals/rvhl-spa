import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogsComponent } from './blogs.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogPostResolve } from './blog-detail/blog-post.resolver';
import { BlogResolve } from './blog.resolver';
const routes: Routes = [
  {
    path: '',
    component: BlogsComponent,
    children: [
      {
        path: 'lich-trinh',
        component: BlogListComponent,
        data: {
          queryBanner: 'SchedulePage',
          breadcrumb: 'Lịch trình',
          position: 'Schedule'
        },

        resolve: {
          blogCategory: BlogResolve
        },
      },
      {
        path: 'an-gi',
        component: BlogListComponent,
        data: { breadcrumb: 'Ăn gì', position: 'Food', queryBanner: 'FoodPage' },
        resolve: {
          blogCategory: BlogResolve
        },
      },
      {
        path: '',
        component: BlogListComponent,
        data: {
          queryBanner: 'SchedulePage',
        },
        resolve: {
          blogCategory: BlogResolve,
        },
      },
      {
        path: ':id/:seo',
        component: BlogDetailComponent,
        data: {
          breadcrumb: '',
        },
        resolve: {
          blogpost: BlogPostResolve
        }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [BlogPostResolve, BlogResolve]
})
export class BlogsRoutingModule { }
