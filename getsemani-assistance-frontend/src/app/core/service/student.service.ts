import { ServerUrlService } from './server-url.service'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { IStudent } from '../model/student.model'
import { IStudentBackend } from '../model/student_backend.model'

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiStudentUrl = this.serverUrlService.getBaseURL() + 'students'

  constructor(private _httpClient: HttpClient, private serverUrlService: ServerUrlService) {}

  public getAllStudents(): Observable<IStudent[]> {
    return this._httpClient.get<IStudent[]>(this.apiStudentUrl)
  }

  public getStudentById(id: string): Observable<IStudentBackend> {
    return this._httpClient.get<IStudentBackend>(`${this.apiStudentUrl}/${id}`)
  }

  public getStudentsByGradeAndSection(grade: string, section: string): Observable<IStudentBackend[]>{
    return this._httpClient.get<IStudentBackend[]>(`${this.apiStudentUrl}/${grade}/${section}`)
  }

  public getByEducationLevelAndGradeAndSection(educationLevel: string, grade: string, section: string): Observable<IStudentBackend[]>{
    return this._httpClient.get<IStudentBackend[]>(`${this.apiStudentUrl}/${educationLevel}/${grade}/${section}`)
  }

  public saveStudent(student: IStudentBackend): Observable<IStudentBackend> {
    return this._httpClient.post<IStudentBackend>(`${this.apiStudentUrl}`, student).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An error occurred while saving the student.'
        if (error.error && error.error.errors) {
          errorMessage = error.error.errors.join('\n')
        }
        return throwError(() => new Error(errorMessage))
      })
    )
  }

  public saveStudentBatch(studentList: IStudentBackend[]): Observable<IStudentBackend[]>{
    return this._httpClient.post<IStudentBackend[]>(`${this.apiStudentUrl}/batch`, studentList).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An error occurred while saving the student.'
        if (error.error && error.error.errors) {
          errorMessage = error.error.errors.join('\n')
        }
        return throwError(() => new Error(errorMessage))
      })
    )
  }

}
