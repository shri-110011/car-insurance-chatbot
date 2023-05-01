import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/Forms/Login/login.service';
import { CarInsuranceService } from './carInsurance.service';
import { HelperService } from 'src/app/shared/helper.service';

@Component({
  selector: 'app-car-insurance-application-form',
  templateUrl: 'carInsuranceApplicationForm.component.html',
  styleUrls: ['carInsuranceApplicationForm.component.css'],
})
export class CarInsuranceApplicationFormComponent {
  constructor(
    private fb: FormBuilder,
    private carInsuranceService: CarInsuranceService,
    private loginService: LoginService,
    private router: Router,
    private helperService: HelperService
  ) {}

  // emailFieldDisabled = true;

  /* Here we use the FormBuilder service provided by Angular to create a reactive 
    form. The FormBuilder provides syntactic sugar that shortens creating instances of 
    a FormControl, FormGroup, or FormArray. It reduces the amount of boilerplate 
    needed to build complex forms.
    */
  insuranceApplication = this.fb.group({
    aadhaarNo: ['', [Validators.required, Validators.pattern('[0-9]{12,12}')]],
    customerName: [
      '',
      [
        Validators.required,
        Validators.pattern('[a-zA-Z ]*'),
        Validators.minLength(3),
        Validators.maxLength(30),
      ],
    ],
    address: this.fb.group({
      street: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-zA-Z0-9- ]*'),
          Validators.minLength(7),
          Validators.maxLength(50),
        ],
      ],
      city: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-zA-Z ]*'),
          Validators.minLength(4),
          Validators.maxLength(35),
        ],
      ],
      pincode: ['', [Validators.required, Validators.pattern('[0-9]{6,6}')]],
      state: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-zA-Z ]*'),
          Validators.minLength(3),
          Validators.maxLength(35),
        ],
      ],
      country: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-zA-Z ]*'),
          Validators.minLength(5),
          Validators.maxLength(35),
        ],
      ],
    }),
    phone: ['', [Validators.required, Validators.pattern('[0-9]{10,10}')]],
    email: [
      this.loginService.getLoggedInUser().email,
      [Validators.required, Validators.email],
    ],
    carModel: [
      '',
      [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9 ]*'),
        Validators.minLength(4),
        Validators.maxLength(25),
      ],
    ],
    licensePlateNo: [
      '',
      [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9 ]*'),
        Validators.minLength(6),
        Validators.maxLength(6),
      ],
    ],
    insurancePlan: ['comprehensive'],
  });

  /* onSubmit() submits the insurance application form by calling the 
    applyCarInsurance() of the CarInsuranceService. We then subscribe for the 
    observable returned by that post request.

    Before calling the applyCarInsurance() we also set the 'insuranceTakenOn' 
    property of the CarInsuranceService using the getDate() of 
    CarInsuranceService.

    Once the insurance application has been processed successfully then we also
    set the 'isInsuranceApplied' property of the CarInsuranceService to true.
    */
  onSubmit() {
    console.log(this.insuranceApplication.value);
    this.carInsuranceService.insuranceTakenOn = this.helperService.getDate();
    console.log(this.carInsuranceService.insuranceTakenOn);
    this.carInsuranceService
      .applyCarInsurance(this.insuranceApplication.value)
      .subscribe(
        (res) => {
          console.log(res);
          if (res.status === 200) {
            console.log(res.body['insuranceId']);
            this.carInsuranceService.isInsuranceApplied = true;
            this.carInsuranceService.insuranceDetails = {
              ...this.insuranceApplication.value,
            };
            this.carInsuranceService.insuranceDetails.insuranceId =
            res.body['insuranceId'];
            console.log(this.carInsuranceService.insuranceDetails);
            this.router.navigate(['user', 'car-insurance-success']);
          }
        },
        (err) => {
          if (err.error.error['errorCode'] === 'DUP_LIC_PLATE_NO') {
            alert('Duplicate license plate number!');
          } else if (err.error.error['errorCode'] === 'EMAIL_ID_MISMATCH') {
            alert('Email you entered must be same as your account email id!');
          } else {
            alert('Something went wrong!');
          }
        }
      );
  }
}
