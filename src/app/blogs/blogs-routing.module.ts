import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogsComponent } from './blogs.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { BlogListComponent } from './blog-list/blog-list.component';

const routes: Routes = [
  {
    path: '',
    component: BlogsComponent,
    children: [
      {
        path: '',
        component: BlogListComponent,
      },
      {
        path: ':id/:seo',
        component: BlogDetailComponent,
        data: {
          breadcrumb: '',
        },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogsRoutingModule { }
