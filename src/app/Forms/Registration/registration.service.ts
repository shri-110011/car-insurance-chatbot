import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable()
export class RegistrationService {

    private _registerUserApi = environment.apiURL+"user/register";

    constructor(private http: HttpClient) { }

    registerUser(user: any): Observable<string> {
        console.log("Inside RegistrationService");
        //console.log(user);
        return this.http.post<string>(this._registerUserApi, {userData: user});
    }
}