import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashBoardComponent } from './dashboard.component';
import { ChatlogComponent } from './chatlog/chatlog.component';
import { ChatDetailComponent } from './chat-detail/chat-detail.component';
import { CarInsuranceDetailsComponent } from './car-insurance-detail/car-insurance-detail.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        DashBoardComponent,
        ChatlogComponent,
        ChatDetailComponent,
        CarInsuranceDetailsComponent
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        SharedModule
    ]
})
export class AdminModule { }

