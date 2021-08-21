import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CarInsuranceService } from "../CarInsuranceApplicationForm/carInsurance.service";
import { CarInsuranceApplicationFormModel } from "../CarInsuranceApplicationForm/carInsuranceApplicationForm.model";

@Component({
    selector: 'app-car-insurance-success-page',
    templateUrl: 'carInsuranceApplicationSuccessPage.component.html',
    styleUrls: ['carInsuranceApplicationSuccessPage.component.css']
})
export class CarInsuranceApplicationSuccessPageComponent implements OnInit{

    ci_details: CarInsuranceApplicationFormModel;

    constructor(private carInsuranceService: CarInsuranceService,
                private router: Router){ 
                    this.ci_details = new CarInsuranceApplicationFormModel();
                }

    ngOnInit() {
        // console.log("Inside carInsuranceApplicationSuccessPageComponent");
        if(this.carInsuranceService.isInsuranceApplied){
            this.ci_details = this.carInsuranceService.insuranceDetails;
        }
        else{
            this.router.navigate(['']);
        }
    }

    ngOnDestroy() {
        this.carInsuranceService.isInsuranceApplied = false;
    }

    getInsuranceAppliedDate(utcDate) {
        return new Date(utcDate).toString().slice(0, 33);
    }
}