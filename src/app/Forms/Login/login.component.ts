import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/auth-service";
import { LoginService } from "./login.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],

})
export class LoginComponent  implements OnInit{
    @ViewChild('loginForm') loginForm: NgForm
    invalidUserCredentials = false;
    userType = "";
    invalidBtnPress = false;

    constructor(private loginService: LoginService,
                private router: Router,
                private authService: AuthService,
                private route: ActivatedRoute) { }

    ngOnInit() {
        this.userType = this.route.snapshot.queryParams["userType"];
        // console.log(this.userType);
        // console.log(this.route);
        this.route.queryParams.subscribe(queryParams=> {
            // console.log("*");
            this.userType = queryParams["userType"];
        })
    }
    
    onLogin() {
        if(this.loginForm.valid){
            this.invalidBtnPress = false;
            console.log(this.loginForm.form.value);
       
            //Code to set the default user type as 'user'
            if(this.userType !== 'user' && this.userType !== 'admin'){
                // console.log("true");
                this.loginForm.form.value["userType"] = "user";
            }
            else{
                this.loginForm.form.value["userType"] = this.userType;
            }
                
            this.loginService.login(this.loginForm.form.value).subscribe(data => {
                console.log(data);
                this.loginService.setLoggedInUser(data["loggedInUser"]);
                if(data["loggedInUser"]["userName"] === "-1" || data["loggedInUser"]["userName"] === "0"){
                    this.invalidUserCredentials = true;
                    console.log("Invalid user credentials: "+this.invalidUserCredentials);
                }
                else{                    
                        console.log("User credentials verified");
                        this.authService.setLoggedInStatus(true);
                        const expiresIn = data["loggedInUser"]["expiresIn"];
                        console.log("expiresIn: ");
                        console.log(expiresIn);
                        const expirationDate = new Date(new Date().getTime() + expiresIn*1000);
                        console.log(expirationDate);
                        this.loginService.autoLogout(expiresIn*1000);
                        if(data["loggedInUser"]["isAdmin"]){
                            this.router.navigate(['/admin']);
                        }
                        else{
                            this.router.navigate(['/user']);
                        }
                }  
            });
        }
        else{
            this.invalidBtnPress = true;
        }
        
    }
}