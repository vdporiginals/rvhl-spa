import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserReviewDetailComponent } from './user-review-detail/user-review-detail.component';
import { UserReviewListComponent } from './user-review-list/user-review-list.component';
import { UserPostResolve } from './user-review-post.resolver';
import { UserReviewComponent } from './user-review.component';
import { UserResolve } from './user-review.resolver';
const routes: Routes = [
    {
        path: '',
        component: UserReviewComponent,
        children: [
            {
                path: '',
                component: UserReviewListComponent,
                pathMatch: 'full',
                resolve: {
                    userCategory: UserResolve
                },
                data: {
                    queryBanner: 'ReviewPage',
                    //   position: 'Schedule'
                },
            },
            {
                path: ':id/:seo',
                pathMatch: 'full',
                component: UserReviewDetailComponent,
                data: { breadcrumb: '' },
                resolve: {
                    userpost: UserPostResolve
                },
            },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [UserPostResolve, UserResolve]
})
export class UserReviewRoutingModule { }
