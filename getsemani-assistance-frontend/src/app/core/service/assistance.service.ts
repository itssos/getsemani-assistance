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

  public getFilteredAssistance(education: string, grade: string, section: string, startDate: string, endDate: string): Observable<IAssistance[]> {
    let params = new HttpParams();
    if (education) {
      params = params.set('education', education);
    }
    if (grade) {
      params = params.set('grade', grade);
    }
    if (section) {
      params = params.set('section', section);
    }
    if (startDate) {
      params = params.set('startDate', startDate);
    }
    if (endDate) {
      params = params.set('endDate', endDate);
    }
    return this._httpClient.get<IAssistance[]>(`${this.apiUrl}`, { params: params });
  }

  public registerAssistance(assistance: IAssistance): Observable<IAssistance> {
    return this._httpClient.post<IAssistance>(`${this.apiUrl}`, assistance);
  }

}
