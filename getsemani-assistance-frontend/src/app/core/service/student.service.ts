import { ServerUrlService } from './server-url.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IStudent } from '../model/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiStudentUrl = this.serverUrlService.getBaseURL() + 'students';

  constructor(private _httpClient: HttpClient, private serverUrlService: ServerUrlService) {}

  public getAllStudents(): Observable<IStudent[]> {
    return this._httpClient.get<IStudent[]>(this.apiStudentUrl);
  }

  public getStudentById(id: number): Observable<IStudent> {
    return this._httpClient.get<IStudent>(`${this.apiStudentUrl}/${id}`);
  }

  public saveStudent(student: IStudent): Observable<IStudent> {
    return this._httpClient.post<IStudent>(`${this.apiStudentUrl}`, student).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An error occurred while saving the student.';
        if (error.error && error.error.errors) {
          errorMessage = error.error.errors.join('\n');
        }
        return throwError(() => new Error(errorMessage));
      })
    )
  }
}
