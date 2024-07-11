import { ServerUrlService } from './server-url.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAssistance } from '../model/assistance.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssistanceService {

  private apiUrl = this.serverUrlService.getBaseURL()+'assistance'

  constructor(private _httpClient: HttpClient, private serverUrlService: ServerUrlService) { }

  public getAll(): Observable<IAssistance[]>{
    return this._httpClient.get<IAssistance[]>(`${this.apiUrl}`)
  }

  public getFilteredAssistance(day: number, month: number, grade: string, section: string): Observable<IAssistance[]> {
    let params = new HttpParams();
    if (day) {
      params = params.set('day', day.toString());
    }
    if (month) {
      params = params.set('month', month.toString());
    }
    if (grade) {
      params = params.set('grade', grade);
    }
    if (section) {
      params = params.set('section', section);
    }
    return this._httpClient.get<IAssistance[]>(`${this.apiUrl}`, { params: params });
  }

  public registerAssistance(assistance: IAssistance): Observable<IAssistance> {
    return this._httpClient.post<IAssistance>(`${this.apiUrl}`, assistance);
  }
  
  public getStudentsWithTardiness(): Observable<any[]> {
    const url = `${this.apiUrl}/students/tardiness`; 
    return this._httpClient.get<any[]>(url);
  }
  public getAssistancesByUser(): Observable<any[]> {
    return this._httpClient.get<any[]>(`${this.apiUrl}/assistances`);
  }
  public getAssistanceCounts(): Observable<any> {
    const url = `${this.apiUrl}/counts`;
    return this._httpClient.get<any>(url);
  }
  public getTardinessCounts(): Observable<any[]> {
    return this._httpClient.get<any[]>(`${this.apiUrl}/tardiness-counts`);
  }
}
