import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable()
export class RegistrationService {

    private _registerUserApi = environment.apiURL+"user/register";

    constructor(private http: HttpClient) { }

    /* registerUser() sends a request to the 'user/register' api in order
    to register the new user. The response has this structure:
    In case of successful registration:
    {
        "statusCode": 200,
        "message": "New user inserted successfully!"
    }
    In case of server error:
    {
        "error": {
            "statusCode": 500,
            "message": "Something went wrong in the server!"
        }
    }
    In case the email already exists:
    {
        "error": {
            "statusCode": 400,
            "message": "Email id 'Abc1@gmaiil.com' already exists!"
        }
    }
    */
    registerUser(user: any): Observable<object> {
        console.log("Inside RegistrationService");
        //console.log(user);
        return this.http.post<object>(this._registerUserApi, {userData: user}, {
            observe: 'response'
          });
    }
}