import { Component, Input, OnInit } from "@angular/core";
import { CarInsuranceDetailsModel } from "../carInsuranceDetails.model";

@Component({
    selector: 'app-car-insurance-details-table',
    templateUrl: 'carInsuranceDetailsTable.component.html',
    styleUrls: ['carInsuranceDetailsTable.component.css']
})
export class CarInsuranceDetailsTableComponent implements OnInit{

    @Input() insuranceDetail: CarInsuranceDetailsModel;

    ngOnInit() {
        // console.log(this.insuranceDetail);
    }  

    getProperDate(utcDate) {
        if(utcDate === null){
            return utcDate;
        }
        return new Date(utcDate).toString().slice(0, 33);
    } 
}