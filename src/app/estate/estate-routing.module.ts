import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EstateDetailResolve } from './estate-detail.resolver';
import { EstateListResolve } from './estate-list.resolver';
import { HotelDetailComponent } from './hotel-detail/hotel-detail.component';
import { HomestayDetailComponent } from './homestay-detail/homestay-detail.component';
import { VillaDetailComponent } from './villa-detail/villa-detail.component';
import { HotelComponent } from './hotel/hotel.component';
import { HomestayComponent } from './homestay/homestay.component';
import { VillaComponent } from './villa/villa.component';
import { EstateComponent } from './estate.component';


const routes: Routes = [
    {
        path: '',
        component: EstateComponent,
        children: [
            {
                path: '',
                redirectTo: 'khach-san',
            },
            {
                path: 'khach-san',
                component: HotelComponent,
                pathMatch: 'full',
                resolve: {
                    estateList: EstateListResolve
                },
                data: { categoryId: '', breadcrumb: 'Khách sạn', queryBanner: 'HotelPage' },
            },
            {
                path: 'khach-san/:id/:seo',
                component: HotelDetailComponent,
                resolve: {
                    estateDetail: EstateListResolve
                },
                data: { breadcrumb: '' },
            },
            {
                path: 'homestay',
                component: HomestayComponent,
                pathMatch: 'full',
                resolve: {
                    estateList: EstateListResolve
                },
                data: { categoryId: '', breadcrumb: 'Homestay', queryBanner: 'HomestayPage' },
            },
            {
                path: 'homestay/:id/:seo',
                component: HomestayDetailComponent,
                resolve: {
                    estateDetail: EstateListResolve
                },
                data: { breadcrumb: '' },
            },
            {
                path: 'villa',
                component: VillaComponent,
                pathMatch: 'full',
                resolve: {
                    estateList: EstateListResolve
                },
                data: { categoryId: '', breadcrumb: 'Villa', queryBanner: 'VillaPage' },
            },
            {
                path: 'villa/:id/seo',
                component: VillaDetailComponent,
                resolve: {
                    estateDetail: EstateListResolve
                },
                data: { breadcrumb: '' },
            }]

    }
];

@NgModule({
    declarations: [],
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [EstateDetailResolve, EstateListResolve]
})
export class EstateRoutingModule { }
