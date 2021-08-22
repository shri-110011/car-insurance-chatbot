import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/auth-service";
import { LoginService } from "src/app/Forms/Login/login.service";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
    userName = "";
    userLoggedIn = false;
    isAdmin = false;
    loginEventSub: Subscription;
    logoutEventSub: Subscription;
    isNavbarToBeCollapsed = false;

    constructor(private authService: AuthService,
                private router: Router,
                private loginService: LoginService) { }

    ngOnInit() {
        this.loginEventSub = this.authService.loggedInEvent.subscribe(res => {
            // console.log(res);
            this.userName = res['userName'];
            this.isAdmin = res['isAdmin'];
            this.userLoggedIn = true;
            // console.log("userName: "+this.userName);
        });
        this.logoutEventSub = this.authService.loggedOutEvent.subscribe(() => {
            this.authService.setLoggedInStatus(false);
            this.userLoggedIn = false;
            this.router.navigate(['/']);
        });
    }
    onLogout() {
        this.isNavbarToBeCollapsed = !this.isNavbarToBeCollapsed;
        this.logoutEventSub = this.loginService.logout(this.loginService.getLoggedInUser()).subscribe((res)=>{
            console.log(res);
            if(res["logoutStatus"]){
                this.authService.loggedOutEvent.emit();
            }
        })
    }
    toggleNavbar() {
        console.log("Inside collapseNavbar");
        this.isNavbarToBeCollapsed = !this.isNavbarToBeCollapsed;
    }
    ngOnDestroy() {
        this.loginEventSub.unsubscribe();
        this.logoutEventSub.unsubscribe();
    }
}