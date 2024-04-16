import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAssistance } from '../model/assistance.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssistanceService {
  private baseURL = 'https://192.168.1.105:8443/api/assistance'

  constructor(private _httpClient: HttpClient) { }

  public getAllAssistance(): Observable<IAssistance[]>{
    return this._httpClient.get<IAssistance[]>(`${this.baseURL}`)
  }

  public registerAssistance(assistanceData: any): Observable<IAssistance> {
    return this._httpClient.post<IAssistance>(`${this.baseURL}`, assistanceData);
  }

}
