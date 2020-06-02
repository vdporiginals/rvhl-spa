import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstateDetailResolve } from './estate-detail.resolver';
import { EstateListResolve } from './estate-list.resolver';
import { EstateComponent } from './estate.component';
import { HomestayDetailComponent } from './homestay-detail/homestay-detail.component';
import { HomestayComponent } from './homestay/homestay.component';
import { HotelDetailComponent } from './hotel-detail/hotel-detail.component';
import { HotelComponent } from './hotel/hotel.component';
import { VillaDetailComponent } from './villa-detail/villa-detail.component';
import { VillaComponent } from './villa/villa.component';


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
                // pathMatch: 'full',
                data: { categoryId: '', breadcrumb: 'Khách sạn', position: 'hotel', queryBanner: 'HotelPage' },
                children: [
                    {
                        path: '',
                        component: HotelComponent,
                        pathMatch: 'full',
                        resolve: {
                            estateList: EstateListResolve
                        },
                    },
                    {
                        path: ':id/:seo',
                        component: HotelDetailComponent,
                        pathMatch: 'full',
                        resolve: {
                            estateDetail: EstateDetailResolve
                        },
                        data: { breadcrumb: '' },
                    },
                ]
            },
            {
                path: 'homestay',
                data: { categoryId: '', breadcrumb: 'Homestay', queryBanner: 'HomestayPage', position: 'homestay' },
                children: [
                    {
                        path: '',
                        component: HomestayComponent, pathMatch: 'full',
                        resolve: {
                            estateList: EstateListResolve
                        },
                    },
                    {
                        path: ':id/:seo',
                        component: HomestayDetailComponent,
                        pathMatch: 'full',
                        resolve: {
                            estateDetail: EstateDetailResolve
                        },
                        data: { breadcrumb: '' },
                    },
                ]
            },
            {
                path: 'villa',

                data: { categoryId: '', position: 'villa', breadcrumb: 'Villa', queryBanner: 'VillaPage' },
                children: [
                    {
                        path: '',
                        component: VillaComponent,
                        pathMatch: 'full',
                        resolve: {
                            estateList: EstateListResolve
                        },
                    },
                    {
                        path: ':id/:seo',
                        component: VillaDetailComponent,
                        pathMatch: 'full',
                        resolve: {
                            estateDetail: EstateDetailResolve
                        },
                        data: { breadcrumb: '' },
                    },
                ]
            },
        ]

    },
];

@NgModule({
    declarations: [],
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [EstateDetailResolve, EstateListResolve]
})
export class EstateRoutingModule { }
