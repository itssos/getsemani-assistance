import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Grade } from '../model/grade.model';
@Injectable({
  providedIn: 'root'
})
export class GradeService {
  private apiUrl = 'https://localhost:8443/api/grade';
  constructor(private http: HttpClient) { }

  getAllGrades(): Observable<Grade[]> {
    return this.http.get<Grade[]>(this.apiUrl);
  }

  createGrade(grade: Grade): Observable<Grade>{
    return this.http.post<Grade>(this.apiUrl, grade);
  }

  deleteGrade(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
  updateGrade(id: number, updatedGrade: Grade): Observable<Grade> {
    return this.http.put<Grade>(`${this.apiUrl}/${id}`, updatedGrade);
  }
  
}
