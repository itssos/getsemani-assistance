import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IStudent } from '../model/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseURL = 'https://192.168.1.105:8443/api/students'

  constructor(private _httpClient: HttpClient) { }

  public getAllStudents(): Observable<IStudent[]>{
    return this._httpClient.get<IStudent[]>(this.baseURL)
  }

  public getStudentById(id: number): Observable<IStudent>{
    return this._httpClient.get<IStudent>(`${this.baseURL}/${id}`)
  }

  public saveStudent(student: IStudent): Observable<IStudent>{
    return this._httpClient.post<IStudent>(`${this.baseURL}`, student)
  }

}
