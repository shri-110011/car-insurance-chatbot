import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { CarInsuranceService } from "../CarInsuranceApplicationForm/carInsurance.service";

@Component({
    selector: 'app-car-insurance-claim',
    templateUrl: 'carInsuranceClaim.component.html',
    styleUrls: ['carInsuranceClaim.component.css']
})
export class CarInsuranceClaimComponent{

    @ViewChild("carInsuranceClaimForm") carInsuranceClaimForm: NgForm;

    claimBtnPressed = false;

    claimSuccessful:boolean = false;
    claimedAlready:boolean = false;
    invalidClaim:boolean = false;

    constructor(private carInsuranceService: CarInsuranceService) { }

    onClaim() {
        // console.log(this.carInsuranceClaimForm);
        this.claimBtnPressed = true;
        this.carInsuranceService.claimCarInsurance(this.carInsuranceClaimForm.value)
        .subscribe(res=> {
            console.log(res);
            //msg = 1 means Insurance Id and Email are clashing.
            //msg = -1 means Insurance Id doesn't exist in records.
            //msg = 0 means this Insurance Id has been already claimed. 
            if(res["msg"] === "-1" || res["msg"] === "1"){
                this.invalidClaim = true;
                this.claimedAlready = false;
                this.claimSuccessful = false;
            }
            if(res["msg"] === "0" ){
                this.invalidClaim = false;
                this.claimedAlready = true;
                this.claimSuccessful = false;
            }
            if(res["msg"] === "Success!" ){
                this.invalidClaim = false;
                this.claimedAlready = false;
                this.claimSuccessful = true;
            }
        }, (error)=>{
            console.error(error);
        });
    }
}