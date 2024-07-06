import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { LoginService } from '../auth/login.service';
import { distinctUntilChanged, map,Subscription,tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';


@Directive({
  selector: '[appRol]',
  standalone: true
})
export class RolDirective implements OnInit,OnDestroy {
  
  constructor(private _loginService:LoginService,private _jwtHelper: JwtHelperService,private _viewContainerRef:ViewContainerRef,
              private _templateRef:TemplateRef<any>) {}

  @Input('appRol') allowedRoles:any;
  private sub?:Subscription;
  
  ngOnInit(): void {
    this.sub=this._loginService.currentUserData.pipe(
      map((value: any) => {
        const token = value.toString();
        const decodedToken = this._jwtHelper.decodeToken(token);
        const roleUser: string = decodedToken.role;
        return Boolean(roleUser && this.allowedRoles.includes(roleUser));
      }),distinctUntilChanged(),
      tap((hasRole)=> hasRole ? this._viewContainerRef.createEmbeddedView(this._templateRef) : this._viewContainerRef.clear())
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
