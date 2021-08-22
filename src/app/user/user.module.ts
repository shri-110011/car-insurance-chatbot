import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { CarInsuranceApplicationFormComponent } from './CarInsuranceApplicationForm/carInsuranceApplicationForm.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarInsuranceService } from './CarInsuranceApplicationForm/carInsurance.service';
import { CarInsuranceApplicationSuccessPageComponent } from './CarInsuranceApplicationSuccessPage/carInsuranceApplicationSuccessPage.component';
import { MyCarInsuranceDetailsComponent } from './CarInsuranceDetails/carInsuranceDetails.component';
import { CarInsuranceDetailsTableComponent } from './CarInsuranceDetails/CarInsuranceDetailsTable/carInsuranceDetailsTable.component';
import { CarInsuranceClaimComponent } from './CarInsuranceClaim/carInsuranceClaim.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
                  UserComponent,
                  CarInsuranceApplicationFormComponent,
                  CarInsuranceApplicationSuccessPageComponent,
                  MyCarInsuranceDetailsComponent,
                  CarInsuranceDetailsTableComponent,
                  CarInsuranceClaimComponent,
                ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    CarInsuranceService
  ]
})
export class UserModule { }
