import { Component, OnInit } from '@angular/core';
import { CarInsuranceService } from '../CarInsuranceApplicationForm/carInsurance.service';
import { CarInsuranceDetailsModel } from './carInsuranceDetails.model';

@Component({
  selector: 'app-my-car-insurance-details',
  templateUrl: 'carInsuranceDetails.component.html',
  styleUrls: ['carInsuranceDetails.component.css'],
})
export class MyCarInsuranceDetailsComponent implements OnInit {
  myDetails: CarInsuranceDetailsModel[] = [];
  isThereAnyDetails = false;
  isLoading = true;
  altText = "";
  hasErrorOccurred = false;

  constructor(private carInsuranceService: CarInsuranceService) {}

  /* Here we call the getCarInsuranceDetails() method of 
    CarInsuranceService to get details of all the car insurances applied. 
    Each car insurance detail is of type: CarInsuranceDetailsModel. */
  ngOnInit() {
    this.carInsuranceService.getCarInsuranceDetails().subscribe(
      (res) => {
        // console.log(res);
        this.myDetails = res;
        console.log(this.myDetails);
        if (this.myDetails.length > 0) {
          this.isThereAnyDetails = true;
        } else {
          this.isThereAnyDetails = false;
        }
        this.isLoading = false;
        this.hasErrorOccurred = false;
        if(!this.isThereAnyDetails)
          this.altText = "You have not applied for any car insurance yet!";
      },
      (error) => {
        this.isLoading = false;
        this.hasErrorOccurred = true;
        this.altText = "Some technical issue has occurred! Please try again later!"
      }
    );
  }
}
