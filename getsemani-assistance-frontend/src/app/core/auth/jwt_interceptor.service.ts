import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { LoginService } from "./login.service";

@Injectable({
    providedIn: 'root'
})

export class jwtInterceptor implements HttpInterceptor {

    constructor(private loginService:LoginService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token:String=this.loginService.userToken;
        console.log('JWT Interceptor - Token:', token);
        
        if (req.url.includes('/auth/login')) {
          return next.handle(req);
        }
        if (token!=""){
          req=req.clone(
            {
              setHeaders: {
                'Content-Type': 'application/json; charset=utf-8',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
            }
          );
        }
        return next.handle(req);
      }
}
