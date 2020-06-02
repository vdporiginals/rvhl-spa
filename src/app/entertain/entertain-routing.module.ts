import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntertainDetailResolve } from './entertain-detail.resolver';
import { EntertainDetailComponent } from './entertain-detail/entertain-detail.component';
import { EntertainListComponent } from './entertain-list/entertain-list.component';
import { EntertainComponent } from './entertain.component';
import { EntertainResolve } from './entertain.resolver';

const routes: Routes = [
    {
        path: '',
        component: EntertainComponent,
        children: [
            {
                path: '',
                component: EntertainListComponent,
                pathMatch: 'full',
                resolve: {
                    entertainCategory: EntertainResolve
                },
                data: {
                    queryBanner: 'EntertainPage',
                },
            },
            {
                path: ':id/:seo',
                pathMatch: 'full',
                component: EntertainDetailComponent,
                data: { breadcrumb: '' },
                resolve: {
                    entertainDetail: EntertainDetailResolve
                },
            },

        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [EntertainResolve, EntertainDetailResolve]
})
export class EntertainRoutingModule { }
