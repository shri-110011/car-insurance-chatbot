import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { LoginService } from "../Forms/Login/login.service";

@Component({
    selector: 'app-dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.css']
})
export class DashBoardComponent {
    userName = "";
    constructor(private loginService: LoginService,
                private router: Router) { 
    }

    ngOnInit() {
        /*This is a mandatory check to prevent a logged in user from entering into the 
        admin view from the url bar.*/
        if(this.loginService.getLoggedInUser()['isAdmin']){
            this.userName = this.loginService.getLoggedInUser()['userName'];
        }
        else{
            this.router.navigate(['/home']);
        }
       
    }
}