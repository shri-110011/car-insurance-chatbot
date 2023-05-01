import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth-service';
import { LoginService } from './Forms/Login/login.service';
import { LoggedInUser } from './loggedInUser';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    private authService: AuthService
  ) {}

  /* In this ngOnInit() life cycle hook we are calling the verifyToken() method
  of the LoginService and then subscribe to its http response. This verifyToken() 
  would send the cookie('token') that we received from the backend while login
  on each subsequent request to the backend.
  
  Once we get the token validity status as true we then:
  1. Set the logged in user information and also set the timer for auto logout feature 
  using the LoginService object.

  2. Set the login status and emit the logged in event using AuthService object.
  */
  ngOnInit() {
    console.log('Inside app.component.ts ngOnInit');
    this.loginService
      .verifyToken()
      .subscribe((res) => {
        console.log('Got token verification response');
        console.log(res);
        if(res.status == 200) {
          this.loginService.setLoggedInUser(res.body);
          this.loginService.autoLogout(res.body["expiresIn"]* 1000);
          this.authService.setLoggedInStatus(true);
          this.authService.loggedInEvent.emit(res.body);
        }
      }, err => {
        console.log(err.message);
      });
  }

  ngOnDestroy() {
    console.log("Inside ngOnDestroy()");
  }
}
