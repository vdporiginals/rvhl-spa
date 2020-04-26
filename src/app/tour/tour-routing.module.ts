import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ListSingleTourComponent } from './list-single-tour/list-single-tour.component';
import { TourComponent } from './tour.component';
import { TourDetailComponent } from './tour-detail/tour-detail.component';
import { AllTourComponent } from './all-tour/all-tour.component';

const routes: Routes = [
  {
    path: '',
    component: TourComponent,
    children: [
      {
        path: '',
        component: AllTourComponent,
      },
      {
        path: 'di-chuyen',
        component: ListSingleTourComponent,
        data: { category: 'Transfer', breadcrumb: 'Di chuyển', queryBanner: 'bannerTransfer' },
        children: [{ path: ':id/:seo', component: TourDetailComponent }]
      },
      {
        path: 'khach-san',
        component: ListSingleTourComponent,
        data: { category: 'Hotel', breadcrumb: 'Khách sạn', queryBanner: 'bannerHotel' },
        children: [{ path: ':id/:seo', component: TourDetailComponent }]
      },
      {
        path: 'ha-long-bay-tour',
        component: ListSingleTourComponent,
        data: { category: 'Cruise', breadcrumb: 'Tour vịnh', queryBanner: 'bannerCruise' },
        children: [{ path: ':id/:seo', component: TourDetailComponent }]
      },
      {
        path: 'tron-goi',
        component: ListSingleTourComponent,
        data: { category: 'AllInOne', breadcrumb: 'Trọn gói', queryBanner: 'bannerTour' },
        children: [{ path: ':id/:seo', component: TourDetailComponent }]
      }
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
