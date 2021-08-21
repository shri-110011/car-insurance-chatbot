import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarInsuranceApplicationFormComponent } from './CarInsuranceApplicationForm/carInsuranceApplicationForm.component';
import { CarInsuranceApplicationSuccessPageComponent } from './CarInsuranceApplicationSuccessPage/carInsuranceApplicationSuccessPage.component';
import { CarInsuranceClaimComponent } from './CarInsuranceClaim/carInsuranceClaim.component';
import { MyCarInsuranceDetailsComponent } from './CarInsuranceDetails/carInsuranceDetails.component';

import { UserComponent } from './user.component';

const routes: Routes = [
  { 
    path: '', 
    component: UserComponent,
    children: [
      {
        path: 'car-insurance-apply',
        component: CarInsuranceApplicationFormComponent
      },
      {
        path: 'car-insurance-success',
        component: CarInsuranceApplicationSuccessPageComponent
      },
      {
        path: 'car-insurance-details',
        component: MyCarInsuranceDetailsComponent
      },
      {
        path: 'car-insurance-claim',
        component: CarInsuranceClaimComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
