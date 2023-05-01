import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";

/* This AuthInterceptorService main purpose is to intercept the http request heading
to http://localhost:3000 and set the {withCredentials: true} object in the HttpRequest
object. This is necessary for the cross domain sharing of cookies. */
export class AuthInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        if(req.url.includes("http://localhost:3000")) {
            const modifiedRequest = req.clone({withCredentials: true});
            return next.handle(modifiedRequest);
        }
        else {
            return next.handle(req);
        }
        
    }
}