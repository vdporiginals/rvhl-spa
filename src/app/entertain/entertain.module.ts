import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EntertainComponent } from './entertain.component';
import { EntertainListComponent } from './entertain-list/entertain-list.component';
import { EntertainDetailComponent } from './entertain-detail/entertain-detail.component';
import { EntertainFilterComponent } from './entertain-filter/entertain-filter.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FlexLayoutModule,
        FlexLayoutModule.withConfig({ ssrObserveBreakpoints: ['xs', 'lt-md'] })
    ],
    declarations: [EntertainComponent, EntertainListComponent, EntertainDetailComponent, EntertainFilterComponent],
})
export class EntertainModule { }

