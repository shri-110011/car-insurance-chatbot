import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class RegistrationService {

    private _registerUserApi = "http://localhost:3000/user/register";

    constructor(private http: HttpClient) { }

    registerUser(user: any): Observable<string> {
        console.log("Inside RegistrationService");
        //console.log(user);
        return this.http.post<string>(this._registerUserApi, {userData: user});
    }
}