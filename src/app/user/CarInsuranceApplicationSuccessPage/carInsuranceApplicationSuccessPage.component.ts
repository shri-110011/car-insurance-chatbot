import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarInsuranceService } from '../CarInsuranceApplicationForm/carInsurance.service';
import { CarInsuranceApplicationFormModel } from '../CarInsuranceApplicationForm/carInsuranceApplicationForm.model';

@Component({
  selector: 'app-car-insurance-success-page',
  templateUrl: 'carInsuranceApplicationSuccessPage.component.html',
  styleUrls: ['carInsuranceApplicationSuccessPage.component.css'],
})
export class CarInsuranceApplicationSuccessPageComponent implements OnInit {
  ci_details: CarInsuranceApplicationFormModel;

  constructor(
    private carInsuranceService: CarInsuranceService,
    private router: Router
  ) {
    this.ci_details = new CarInsuranceApplicationFormModel();
  }

  /* In the ngOnInit() life cycle hook we initialize the 'ci_details' property with the
  value stored in the 'insuranceDetails' property of CarInsuranceService. */
  ngOnInit() {
    if (this.carInsuranceService.isInsuranceApplied) {
      this.ci_details = this.carInsuranceService.insuranceDetails;
    } else {
      this.router.navigate(['']);
    }
  }

  ngOnDestroy() {
    this.carInsuranceService.isInsuranceApplied = false;
  }

  /* getInsuranceAppliedDate() converts the ISO-8601 UTC time to local time and
  then strip the date in order to format it. 
  
  ISO-8601 UTC time: 2023-04-22T05:28:56.000Z

  new Date('2023-04-22T05:28:56.000Z') returns:
  Sat Apr 22 2023 10:58:56 GMT+0530 (India Standard Time)

  Formatted date from getInsuranceAppliedDate():
  Sat Apr 22 2023 10:58:56 GMT+0530
 */
  getInsuranceAppliedDate(utcDate) {
    return new Date(utcDate).toString().slice(0, 33);
  }
}
