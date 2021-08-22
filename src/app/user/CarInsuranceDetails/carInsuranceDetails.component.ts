import { Component, OnInit } from "@angular/core";
import { CarInsuranceService } from "../CarInsuranceApplicationForm/carInsurance.service";
import { CarInsuranceDetailsModel } from "./carInsuranceDetails.model";

@Component({
    selector: 'app-my-car-insurance-details',
    templateUrl: 'carInsuranceDetails.component.html',
    styleUrls: ['carInsuranceDetails.component.css']
})
export class MyCarInsuranceDetailsComponent implements OnInit{
    myDetails: CarInsuranceDetailsModel[] = [];
    isThereAnyDetails = false;
    isLoading = true;

    constructor(private carInsuranceService: CarInsuranceService) { }

    ngOnInit() {
        this.carInsuranceService.getCarInsuranceDetails()
            .subscribe(res=> {
                // console.log(res);
                this.myDetails = res;
                console.log(this.myDetails);
                if(this.myDetails.length > 0 ){
                    this.isThereAnyDetails = true;
                }
                else{
                    this.isThereAnyDetails = false;
                }
                this.isLoading = false;
            }, (error)=>{
                console.error(error);
            });
    }
}