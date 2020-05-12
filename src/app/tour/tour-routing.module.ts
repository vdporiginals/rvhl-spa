import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ListSingleTourComponent } from './list-single-tour/list-single-tour.component';
import { TourComponent } from './tour.component';
import { TourDetailComponent } from './tour-detail/tour-detail.component';
import { TourResolve } from './tour.resolver';
import { TourDetailResolve } from './tour-detail/tour-detail.resolver';

const routes: Routes = [
  {
    path: '',
    component: TourComponent,
    children: [
      {
        path: '',
        redirectTo: 'ha-long-bay-tour',
        resolve: {
          tourCategory: TourResolve
        },
      },
      {
        path: 'di-chuyen',
        component: ListSingleTourComponent,
        resolve: {
          tourCategory: TourResolve
        },
        data: { category: 'Transfer', categoryId: '', breadcrumb: 'Di chuyển', queryBanner: 'TransferPage' },
      },
      {
        path: 'di-chuyen/:id/:seo',
        component: TourDetailComponent,
        data: { breadcrumb: '' },
        resolve: {
          tourpost: TourDetailResolve
        },
      },
      {
        path: 'ha-long-bay-tour',
        component: ListSingleTourComponent,
        resolve: {
          tourCategory: TourResolve
        },
        data: { category: 'Cruise', categoryId: '', breadcrumb: 'Tour vịnh', queryBanner: 'TourCruisePage' },
      },
      {
        path: 'ha-long-bay-tour/:id/:seo',
        component: TourDetailComponent,
        data: { breadcrumb: '' },
        resolve: {
          tourpost: TourDetailResolve
        },
      },
      {
        path: 'tron-goi',
        component: ListSingleTourComponent,
        resolve: {
          tourCategory: TourResolve
        },
        data: { category: 'AllInOne', categoryId: '', breadcrumb: 'Trọn gói', queryBanner: 'TourAllPage' },
      },
      {
        path: 'tron-goi/:id/:seo',
        component: TourDetailComponent,
        data: { breadcrumb: '' },
        resolve: {
          tourpost: TourDetailResolve
        },
      },

    ]
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [TourDetailResolve, TourResolve]
})
export class TourRoutingModule { }
