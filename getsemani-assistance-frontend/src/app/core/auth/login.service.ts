import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILoginRequest } from '../model/login_request.model'
import  {  Observable, throwError, catchError, BehaviorSubject , tap, map} from 'rxjs';
import { ServerUrlService } from '../service/server-url.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<String> =new BehaviorSubject<String>("");

  constructor(private http: HttpClient,private _serverUrlService: ServerUrlService,private _router:Router, private _jwtHelper: JwtHelperService ) { 
    this.currentUserLoginOn=new BehaviorSubject<boolean>(localStorage.getItem("token")!=null);
    this.currentUserData=new BehaviorSubject<String>(localStorage.getItem("token") || "");
  }

  login(credentials:ILoginRequest):Observable<any>{
    return this.http.post<any>(this._serverUrlService.getHostURL()+"auth/login",credentials).pipe(
      tap( (userData) => {  
        localStorage.setItem("token", userData.token);
        this.currentUserData.next(userData.token);
        this.currentUserLoginOn.next(true);
      }),
      map((userData)=> userData.token),
      catchError(this.handleError)
    );
  }

  logout():void{
    localStorage.removeItem("token");
    this.currentUserLoginOn.next(false);
    this._router.navigateByUrl("/login");
  }

  private handleError(error:HttpErrorResponse){
    if(error.status===0){
      console.error('Se ha producio un error ', error.error);
    }
    else{
      console.error('Backend retornó el código de estado ', error);
    }
    if (error.status === 400) {
      return throwError('Usuario no encontrado. Verifique e intente nuevamente.');
    } else{
      return throwError('Algo ha fallado. Por favor, inténtelo de nuevo.');
  }
  }

  get userData():Observable<String>{
    return this.currentUserData.asObservable();
  }

  get userLoginOn(): Observable<boolean>{
    return this.currentUserLoginOn.asObservable();
  }

  get userToken():String{
    return this.currentUserData.value;
  }

  getUserIdFromToken(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = this._jwtHelper.decodeToken(token);
        console.log(decodedToken);
        if (decodedToken && decodedToken.sub) {
          return decodedToken.sub;
        } else {
          console.error('Token JWT no contiene el ID de usuario.');
          return null;
        }
      } catch (error) {
        console.error('Error al decodificar el token JWT:', error);
        return null;
      }
    } else {
      console.error('Token JWT no encontrado en el almacenamiento.');
      return null;
    }
  }
}