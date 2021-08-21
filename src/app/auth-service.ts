import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { LoggedInUser } from "./loggedInUser";

@Injectable()
export class AuthService {

    //This loggedIn property is just for testing purpose.
    private loggedIn = false;

    // userName = "";
    // isAdmin = false;

    loggedInEvent = new  EventEmitter<LoggedInUser>();
    loggedOutEvent = new EventEmitter<void>();

    constructor(private http: HttpClient) { }

    isAuthenticated() {
        const promise = new Promise(
            (resolve, reject)=>{
                //Dummy delay.
                // setTimeout(()=>{
                //     console.log("loggedIn: "+this.loggedIn);
                //     resolve(this.loggedIn);
                // },1000);

                //Verifying the token with every erequest to this route.
                // this.loginService.verifyToken(this.loginService.getLoggedInUser()).subscribe((res)=>{
                //     console.log(res);
                //     //Setting the username here is important incase the user refreshes the page from paths other than /user. 
                //     this.userName = res["userName"];
                //     resolve(res["tokenValidity"]);
                // })
                resolve(this.getLoggedInStatus());
        });
        return promise;
    }

    setLoggedInStatus(loginStatus: boolean) {
        // console.log("Inside setLoggedInStatus");
        this.loggedIn = loginStatus; 
    }
    getLoggedInStatus(){
        return this.loggedIn;
    }
}