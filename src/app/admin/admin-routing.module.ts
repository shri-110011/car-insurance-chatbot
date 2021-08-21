import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarInsuranceDetailsComponent } from './car-insurance-detail/car-insurance-detail.component';

import { ChatDetailComponent } from './chat-detail/chat-detail.component';
import { ChatlogComponent } from './chatlog/chatlog.component';
import { DashBoardComponent } from './dashboard.component';

const routes: Routes = [
    {
        path: '',
        component: DashBoardComponent,
        children: [
            {
                path: 'chatlog',
                component: ChatlogComponent
            },
            {
                path: 'chat-details',
                component: ChatDetailComponent
            },
            {
                path: 'insurance-details',
                component: CarInsuranceDetailsComponent
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }