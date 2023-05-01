import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CarInsuranceService } from '../CarInsuranceApplicationForm/carInsurance.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-car-insurance-claim',
  templateUrl: 'carInsuranceClaim.component.html',
  styleUrls: ['carInsuranceClaim.component.css'],
})
export class CarInsuranceClaimComponent {
  @ViewChild('carInsuranceClaimForm') carInsuranceClaimForm: NgForm;

  claimBtnPressed = false;

  claimSuccessful: boolean = false;
  claimedAlready: boolean = false;
  invalidClaim: boolean = false;

  constructor(private carInsuranceService: CarInsuranceService) {}

  /* onClaim() calls the claimCarInsurance() method of the CarInsuranceService for 
    claiming the car insurance. We then subscribe for the observable
    returned by that post request. */
  onClaim() {
    console.log(this.carInsuranceClaimForm);
    this.claimBtnPressed = true;
    this.carInsuranceService
      .claimCarInsurance(this.carInsuranceClaimForm.value)
      .subscribe(
        (res) => {
          console.log(res.body);
          this.invalidClaim = false;
          this.claimedAlready = false;
          this.claimSuccessful = true;
        },
        (error: HttpErrorResponse) => {
          if(error.error.error.errorCode === 'CAR_INSURANCE_CLAIMED_ALREADY') {
            this.invalidClaim = false;
            this.claimedAlready = true;
            this.claimSuccessful = false;
          }
          else if(error.error.error.errorCode === 'INVALID_CAR_INSURANCE_ID' ||
          error.error.error.errorCode === 'EMAIL_ID_MISMATCH') {
            this.invalidClaim = true;
            this.claimedAlready = false;
            this.claimSuccessful = false;
          }
        }
      );
  }
}
