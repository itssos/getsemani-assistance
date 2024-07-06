import { Injectable } from "@angular/core";
import { Observable,tap } from "rxjs";
import { map } from "rxjs/operators";
import { LoginService } from "../auth/login.service";
import { JwtHelperService } from '@auth0/angular-jwt';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private _loginService: LoginService, private _jwtHelper: JwtHelperService, private _router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>{
    const allowedRoles = route.data?.['allowedRoles'];

    return this._loginService.currentUserData.pipe(
      map((value: any) => {
        const token = value.toString();
        const decodedToken = this._jwtHelper.decodeToken(token);
        const roleUser: string = decodedToken.role;
        return Boolean(roleUser && allowedRoles.includes(roleUser));
      }),
      tap((hasRole) => {
        if (!hasRole) {
          this._router.navigate(['/']);
        }
      })
    );
  }
}
