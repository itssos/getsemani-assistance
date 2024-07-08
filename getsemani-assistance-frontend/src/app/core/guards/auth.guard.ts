import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { LoginService } from "../auth/login.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {

  constructor(private router: Router, private loginService: LoginService) {}
    estado:boolean=false;
  canActivate(): boolean {
    this.loginService.userLoginOn.subscribe(value => {
        this.estado=value;
        console.log(value);
      });
    if (this.estado) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
