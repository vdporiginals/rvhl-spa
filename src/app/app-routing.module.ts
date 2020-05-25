import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ProfileComponent } from './layout/user/profile/profile.component';
import { AuthGuard } from './shared/guard/auth.guard';

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
    path: 'o-dau', loadChildren: () => import('./estate/estate.module').then(m => m.EstateModule),
    data: {
      breadcrumb: 'Ở đâu?',
    },
  },
  {
    path: 'an-gi', loadChildren: () => import('./restaurant/restaurant.module').then(m => m.RestaurantModule),
    data: {
      breadcrumb: 'Ăn gì'
    }
  },
  {
    path: 'lich-trinh', loadChildren: () => import('./blogs/blogs.module').then(m => m.BlogsModule),
    data: {
      breadcrumb: 'Lịch trình',
    },
  },
  {
    path: 'tour', loadChildren: () => import('./tour/tour.module').then(m => m.TourModule),
    data: {
      breadcrumb: 'Tour',
    },
  },
  {
    path: 'reviews', loadChildren: () => import('./user-review/user-review.module').then(m => m.UserReviewModule),
    data: {
      breadcrumb: 'Reviews'
    }
  },
  { path: 'profile', component: ProfileComponent, data: { userId: '' }, canActivate: [AuthGuard] },
  { path: '404', component: ErrorPageComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
