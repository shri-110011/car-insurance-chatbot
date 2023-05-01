import { Component, Input } from "@angular/core";
import { CarInsuranceDetailsModel } from "../carInsuranceDetails.model";

@Component({
    selector: 'app-car-insurance-details-table',
    templateUrl: 'carInsuranceDetailsTable.component.html',
    styleUrls: ['carInsuranceDetailsTable.component.css']
})
export class CarInsuranceDetailsTableComponent {

    /* 'insuranceDetail' will get its value from the parent component from 
    where this CarInsuranceDetailsTableComponent will be used. */
    @Input() insuranceDetail: CarInsuranceDetailsModel;

    /* getProperDate() converts the ISO-8601 UTC time to local time and
     then strip the date in order to format it. 
     
    ISO-8601 UTC time: 2023-04-22T05:28:56.000Z

    new Date('2023-04-22T05:28:56.000Z') returns:
    Sat Apr 22 2023 10:58:56 GMT+0530 (India Standard Time)

    Formatted date from getProperDate():
    Sat Apr 22 2023 10:58:56 GMT+0530
    */
    getProperDate(utcDate) {
        if(utcDate === null){
            return utcDate;
        }
        return new Date(utcDate).toString().slice(0, 33);
    } 
}