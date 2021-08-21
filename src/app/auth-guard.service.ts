import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, 
         CanActivate, 
         CanActivateChild, 
         Router, 
         RouterStateSnapshot 
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth-service";
import { LoginService } from "./Forms/Login/login.service";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private authService: AuthService,
                private loginService: LoginService,
                private router: Router) {}
    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.authService.isAuthenticated().then(
            (authenticated: boolean)=>{
                // console.log("Inside auth-guard");
                // console.log("authenticated: "+authenticated);
                if(authenticated) {
                    this.authService.loggedInEvent.emit(this.loginService.getLoggedInUser());
                    return true;
                }
                else {
                    this.router.navigate(['/']);
                }
            }
        )
    }
}