import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/auth-service";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    userLoggedIn = false;
    loginEventSub: Subscription;
    logoutEventSub: Subscription;
    
    constructor(private authService: AuthService) { }
    
    ngOnInit() {
        // console.log("Inside home.component.ts ngOnInit");
        if(this.authService.getLoggedInStatus()){
            this.userLoggedIn = true;
            // console.log("userLoggedIn: "+this.userLoggedIn);
        }
        this.loginEventSub = this.authService.loggedInEvent.subscribe(res => {
            this.userLoggedIn = true;
            // console.log("res: "+res);
        });
        this.logoutEventSub = this.authService.loggedOutEvent.subscribe(()=> {
            this.userLoggedIn = false;
        })
    }

    ngOnDestroy() {
        this.loginEventSub.unsubscribe();
        this.logoutEventSub.unsubscribe();
    }
}