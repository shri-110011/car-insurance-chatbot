import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AuthService } from 'src/app/auth-service';
import { LoggedInUser } from 'src/app/loggedInUser';
import { environment } from '../../../environments/environment';

@Injectable()
export class LoginService {
  private _loginApi = environment.apiURL + 'user/login';
  private _logoutApi = environment.apiURL + 'user/logout';
  private _tokenVerifyApi = environment.apiURL + 'user/token';

  private loggedInUser: LoggedInUser;

  constructor(private http: HttpClient, private authService: AuthService) {}

  /* login() will send the request to the 'user/login' api to log the user in.
  The response body in case the login is successful is of this structure:

  loggedInUser:  {
    userName: string,
    token: string,
    email: string,
    expiresIn: number,
    isAdmin: boolean
  }
  
  */
  login(userCredentials): Observable<object> {
    return this.http
      .post<object>(
        this._loginApi,
        { userCredentials: userCredentials }
      );
  }

  /* logout() will send request to the backend 'user/logout' api and the logout will 
  occur only when the email property of the request body matches the email property 
  encrypted in the 'token' cookie. Once logout occurs successfully the 'token' cookie 
  gets cleared because the backend issues the clear cookie command.
  
  The response body has this structure: {logoutSatus: boolean}
  In case when the user is logged in and the cookie 'token' is from dev tools and then 
  the Logout button is clicked, the response from the 'user/logout' api is 204 
  No_Content http response.
  */
  logout(): Observable<HttpResponse<object>> {
    return this.http.post<object>(this._logoutApi, {
      email: this.loggedInUser.email,
    }, {
      observe: 'response'
    });
  }

  /* autoLogout() is a helper method where we set the timer for the logout event. 
  The expirationDuration we get from the backend in seconds which we convert into
  milliseconds in the front end. */
  autoLogout(expirationDuration) {
    setTimeout(() => {
      this.authService.loggedOutEvent.emit();
      console.log('User logged out!');
    }, expirationDuration);
  }

  /* verifyToken() is helper method will send an http request to the 'user/token' 
  resource path to validate the token validity. The response body for verifyToken() 
  in case the token is valid has this structure:
  {
    "userName": string,
    "isAdmin":boolean,
    "email":string,
    "expiresIn":number
  }

  In case there is no cookie named 'token' then we get: 204 No_Content http response.
  If the cookie named 'token' has invalid value we get: 401 Unauthorized http 
  response.
  */
  verifyToken(): Observable<HttpResponse<LoggedInUser>> {
    return this.http.post<LoggedInUser>(this._tokenVerifyApi, {}, {observe: 'response'});
  }

  getLoggedInUser() {
    return this.loggedInUser;
  }

  setLoggedInUser(loggedInUser: LoggedInUser) {
    this.loggedInUser = loggedInUser;
  }
}