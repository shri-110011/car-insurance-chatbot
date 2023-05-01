import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth-service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') loginForm: NgForm;
  invalidUserCredentials = false;
  userType = '';
  invalidBtnPress = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.userType = this.route.snapshot.queryParams['userType'];
  }

  /* In this onLogin() we call the login() of the LoginService and subscribe to the 
  observable that wraps our http response. 
  
  In case of successful response we use the response to do the following:
  1. Navigate the user to the correct landing page.
  2. To set the timer for the auto logout feature.
  3. To emit the login event.

  In case of wrong email or password we get 401 Unauthorized http error response. 
  */
  onLogin() {
    if (this.loginForm.valid) {
      this.invalidBtnPress = false;
      console.log(this.loginForm.form.value);

      // Code to set the default user type as 'user'.
      if (this.userType !== 'user' && this.userType !== 'admin') {
        this.loginForm.form.value['userType'] = 'user';
      } else {
        this.loginForm.form.value['userType'] = this.userType;
      }

      this.loginService.login(this.loginForm.form.value).subscribe((data) => {
        console.log(data);
        this.loginService.setLoggedInUser(data['loggedInUser']);
        console.log('User credentials verified');
        this.authService.setLoggedInStatus(true);
        const expiresIn = data['loggedInUser']['expiresIn'];
        console.log('expiresIn:' + expiresIn);
        this.loginService.autoLogout(expiresIn * 1000);
        if (data['loggedInUser']['isAdmin']) {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/user']);
        }
      }, err => {
        this.invalidUserCredentials = true;
        console.log(err.error.error.message);
      });
    } else {
      this.invalidBtnPress = true;
    }
  }
}
