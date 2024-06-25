import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILoginRequest } from '../model/login_request.model'
import  {  Observable, throwError, catchError, BehaviorSubject , tap, map} from 'rxjs';
import { ServerUrlService } from '../service/server-url.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<String> =new BehaviorSubject<String>("");

  constructor(private http: HttpClient,private serverUrlService: ServerUrlService,private router:Router) { 
    this.currentUserLoginOn=new BehaviorSubject<boolean>(localStorage.getItem("token")!=null);
    this.currentUserData=new BehaviorSubject<String>(localStorage.getItem("token") || "");
  }

  login(credentials:ILoginRequest):Observable<any>{
    return this.http.post<any>(this.serverUrlService.getHostURL()+"auth/login",credentials).pipe(
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
    this.router.navigateByUrl("/login");
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

}