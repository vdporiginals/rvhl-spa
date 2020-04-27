import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ListSingleTourComponent } from './list-single-tour/list-single-tour.component';
import { TourComponent } from './tour.component';
import { TourDetailComponent } from './tour-detail/tour-detail.component';

const routes: Routes = [
  {
    path: '',
    component: TourComponent,
    children: [
      {
        path: '',
        redirectTo: 'tron-goi'
      },
      {
        path: 'di-chuyen',
        component: ListSingleTourComponent,
        data: { category: 'Transfer', breadcrumb: 'Di chuyển', queryBanner: 'bannerTransfer' },
      },
      {
        path: 'di-chuyen/:id/:seo',
        component: TourDetailComponent,
        data: { breadcrumb: '' }
      },
      {
        path: 'khach-san',
        component: ListSingleTourComponent,
        data: { category: 'Hotel', breadcrumb: 'Khách sạn', queryBanner: 'bannerHotel' },

      },
      {
        path: 'khach-san/:id/:seo',
        component: TourDetailComponent,
        data: { breadcrumb: '' }
      },
      {
        path: 'ha-long-bay-tour',
        component: ListSingleTourComponent,
        data: { category: 'Cruise', breadcrumb: 'Tour vịnh', queryBanner: 'bannerCruise' },
      },
      {
        path: 'ha-long-bay-tour/:id/:seo',
        component: TourDetailComponent,
        data: { breadcrumb: '' }
      },
      {
        path: 'tron-goi',
        component: ListSingleTourComponent,
        data: { category: 'AllInOne', breadcrumb: 'Trọn gói', queryBanner: 'bannerTour' },
      },
      {
        path: 'tron-goi/:id/:seo',
        component: TourDetailComponent,
        data: { breadcrumb: '' }
      },

    ]
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class TourRoutingModule { }
