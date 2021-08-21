import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { LoginService } from "src/app/Forms/Login/login.service";
import { CarInsuranceService } from "./carInsurance.service";

@Component({
    selector: 'app-car-insurance-application-form',
    templateUrl: 'carInsuranceApplicationForm.component.html',
    styleUrls: ['carInsuranceApplicationForm.component.css']
})
export class CarInsuranceApplicationFormComponent { 

    constructor(private fb: FormBuilder,
                private carInsuranceService: CarInsuranceService,
                private loginService: LoginService,
                private route: ActivatedRoute,
                private router: Router){ }

    // emailFieldDisabled = true;

    insuranceApplication = this.fb.group({
        aadhaarNo: ['', [Validators.required, Validators.pattern('[0-9]{12,12}')]],
        customerName: ['', [Validators.required, Validators.pattern("[a-zA-Z ]*"), Validators.minLength(3), Validators.maxLength(30)]],
        address: this.fb.group({
            street: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9\- ]*"), Validators.minLength(7), Validators.maxLength(50)]],
            city: ['', [Validators.required, Validators.pattern("[a-zA-Z ]*"), Validators.minLength(4), Validators.maxLength(35)]],
            pincode: ['', [Validators.required, Validators.pattern('[0-9]{6,6}')]],
            state: ['', [Validators.required, Validators.pattern("[a-zA-Z ]*"), Validators.minLength(3), Validators.maxLength(35)]],
            country: ['', [Validators.required, Validators.pattern("[a-zA-Z ]*"), Validators.minLength(5), Validators.maxLength(35)]],
        }),
        phone: ['', [Validators.required, Validators.pattern('[0-9]{10,10}')]],
        email: [this.loginService.getLoggedInUser().email, [Validators.required, Validators.email]],
        carModel: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9 ]*"), Validators.minLength(4), Validators.maxLength(25)]],
        licensePlateNo: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9 ]*"), Validators.minLength(6), Validators.maxLength(6)]],
        insurancePlan: ['comprehensive']

    })

    onSubmit(){
        console.log(this.insuranceApplication.value);
        this.carInsuranceService.insuranceTakenOn = this.carInsuranceService.getDate();
        console.log(this.carInsuranceService.insuranceTakenOn);
        this.carInsuranceService.applyCarInsurance(this.insuranceApplication.value)
        .subscribe(res=>{
            console.log(res);
            if(res["msg"] === "0"){
                alert("Duplicate license plate number!");
            }
            else if(res["msg"] === "-1"){
                alert("Something went wrong!");
            }
            else if(res["msg"] === "1"){
                alert("Email you entered must be same as your account email id!");
            }
            else{
                console.log(res["insuranceId"]);
                this.carInsuranceService.isInsuranceApplied = true;
                this.carInsuranceService.insuranceDetails = this.insuranceApplication.value; 
                this.carInsuranceService.insuranceDetails.insuranceId = res["insuranceId"];
                console.log(this.carInsuranceService.insuranceDetails);
                this.router.navigate(['user','car-insurance-success']);
            }
        }, (error)=> {
            console.error(error);
        });
    }
}