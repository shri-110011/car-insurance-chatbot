import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegistrationService } from './registration.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [RegistrationService],
})
export class RegistrationComponent implements OnDestroy {
  constructor(private registrationService: RegistrationService) {}

  duplicateEmail = false;
  invalidBtnPress = false;
  registrationSuccessful = false;
  registerUserSub: Subscription;

  registrationForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
      Validators.pattern('[a-zA-Z]*'),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\w+[@]\w+[.]com|in$/),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6) || Validators.maxLength(15),
      Validators.pattern(/^\w*$/),
    ]),
    confirm_password: new FormControl('', [
      Validators.required,
      Validators.minLength(6) || Validators.maxLength(15),
      Validators.pattern(/^\w*$/),
    ]),
  });

  /* onRegister() calls the registerUser() of RegistrationService and if the 
  registration is successful, the Registration successful banner is shown else the 
  appropriate error messages are shown in the template. */
  onRegister() {
    if (this.registrationForm.valid) {
      this.invalidBtnPress = false;
      console.log('Registeration occurred');
      this.registerUserSub = this.registrationService
        .registerUser(this.registrationForm.value)
        .subscribe((res) => {
          console.log(res);
          this.registrationSuccessful = true;
            this.duplicateEmail = false;
            this.registrationForm.reset({
              name: '',
              email: '',
              password: '',
              confirm_password: '',
          });
        }, err => {
          if(err.error.error.statusCode === 400) {
            this.duplicateEmail = true;
            this.registrationSuccessful = false;
          }
        });
    } else {
      this.invalidBtnPress = true;
      this.registrationSuccessful = false;
    }
  }

  ngOnDestroy() {
    if (this.registerUserSub) {
      this.registerUserSub.unsubscribe();
    }
  }
}
