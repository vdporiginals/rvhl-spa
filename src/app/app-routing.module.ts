import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ProfileComponent } from './layout/user/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    loadChildren: () => import('./homepage/homepage.module').then(m => m.HomepageModule)
  },
  {
    path: 'reviews', loadChildren: () => import('./blogs/blogs.module').then(m => m.BlogsModule),

    data: {
      breadcrumb: 'Review',
    },
  },
  {
    path: 'tour', loadChildren: () => import('./tour/tour.module').then(m => m.TourModule)
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  { path: '404', component: ErrorPageComponent },
  { path: '**', redirectTo: '/404' }
  // { path: 'user-profile/:id', component: UserProfileComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
