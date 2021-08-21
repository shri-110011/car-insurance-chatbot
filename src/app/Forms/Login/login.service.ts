import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { AuthService } from "src/app/auth-service";
import { LoggedInUser } from "src/app/loggedInUser";
import { environment } from "../../../environments/environment";

@Injectable()
export class LoginService {
    
    private _loginApi = environment.apiURL+"user/login";
    private _logoutApi = environment.apiURL+"user/logout";
    private _tokenVerifyApi = environment.apiURL+"user/token";

    // private loggedInUser: object;

    private loggedInUser: LoggedInUser;

    constructor(private http: HttpClient,
                private authService: AuthService) { }

    login(userCredentials): Observable<object> {
        // console.log("Inside login service");
        return this.http.post<object>(this._loginApi, {userCredentials: userCredentials})
        .pipe(catchError((errorRes: HttpErrorResponse)=> {
                return throwError(errorRes)
            }),
            //     tap(resData=> {
            //         const expiresIn = +resData["loggedInUser"]["expiresIn"];
            //         console.log("expiresIn: "+expiresIn);
            //         const expirationDate = new Date(new Date().getTime() + expiresIn*1000);
            //         console.log(expirationDate);
            //         this.autoLogout(expiresIn*1000);
            //     })
        );
    }

    logout(loggedInUser: LoggedInUser): Observable<object> {
        console.log("Inside logout service");
        console.log(loggedInUser);
        return this.http.post<object>(this._logoutApi, {loggedInUser: loggedInUser});
    }

    autoLogout(expirationDuration) {
        setTimeout(()=> {
            this.authService.loggedOutEvent.emit();
            console.log("User logged out!");
        }, expirationDuration);
    }

    verifyToken(loggedInUser: any): Observable<object> {
        // console.log("Inside verifyToken service");
        // console.log(loggedInUser);
        return this.http.post<object>(this._tokenVerifyApi, {loggedInUser: loggedInUser});
    }

    getLoggedInUser() {
        return this.loggedInUser;
    }

    setLoggedInUser(loggedInUser: LoggedInUser) {
        this.loggedInUser = loggedInUser;
    }
}