import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ServerUrlService } from './server-url.service'
import { Observable,throwError } from 'rxjs';
import { IUser } from '../model/user.model';
import { catchError } from 'rxjs/operators'

@Injectable({
    providedIn:'root'
})

export class UserService{

    private apiUserUrl = this.serverUrlService.getBaseURL()+'user'
    private apiUserhostUrl = this.serverUrlService.getHostURL()+'auth/register'
    
    constructor(private _httpClient: HttpClient, private serverUrlService: ServerUrlService) {}

    public getAllUser():Observable<IUser[]>{
        return this._httpClient.get<IUser[]>(this.apiUserUrl)
    }
    public getIdUser(id: string):Observable<IUser[]>{
      return this._httpClient.get<IUser[]>(`${this.apiUserUrl}/${id}`);
    }
    public createUser(user: IUser):Observable<IUser>{
        return this._httpClient.post<IUser>(`${this.apiUserhostUrl}`,user).pipe(
            catchError((error: HttpErrorResponse) => {
              let errorMessage = 'An error occurred while saving the user.'
              if (error.error && error.error.errors) {
                errorMessage = error.error.errors.join('\n')
              }
              return throwError(() => new Error(errorMessage))
            })
          )
    }
    public deleteUser(id: string): Observable<void> {
        return this._httpClient.delete<void>(`${this.apiUserUrl}/${id}`).pipe(
          catchError((error: HttpErrorResponse) => {
            let errorMessage = 'An error occurred while deleting the user.';
            if (error.error && error.error.errors) {
              errorMessage = error.error.errors.join('\n');
            }
            return throwError(() => new Error(errorMessage));
          })
        );
      } 
      public updateUser(user: IUser): Observable<IUser> {
        return this._httpClient.put<IUser>(`${this.apiUserUrl}/update`, user).pipe(
          catchError((error: HttpErrorResponse) => {
            let errorMessage = 'An error occurred while updating the user.';
            if (error.error && error.error.errors) {
              errorMessage = error.error.errors.join('\n');
            }
            return throwError(() => new Error(errorMessage));
          })
        );
      }
      public checkDniExists(id: string): Observable<boolean> {
        return this._httpClient.get<boolean>(`${this.apiUserUrl}/${id}`);
      }
}