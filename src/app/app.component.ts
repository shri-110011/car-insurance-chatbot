import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth-service';
import { LoginService } from './Forms/Login/login.service';
import { LoggedInUser } from './loggedInUser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private loginService: LoginService,
              private authService: AuthService
            ) { }  
  
  ngOnInit() {
    console.log("Inside app.component.ts ngOnInit");
    // console.log(this.loginService.getLoggedInUser());
    console.log(this.loginService.getLoggedInUser());
    this.loginService.verifyToken(this.loginService.getLoggedInUser()).subscribe((res: LoggedInUser)=>{
      console.log("Got token verification response");
      console.log(res);
      if(res["tokenValidity"]){
        // console.log("loggedIn set");
        this.loginService.setLoggedInUser(res);
        this.loginService.autoLogout(res["expiresIn"]*1000);
        this.authService.setLoggedInStatus(true);
        this.authService.loggedInEvent.emit(res);
      }
    })
  }
}
