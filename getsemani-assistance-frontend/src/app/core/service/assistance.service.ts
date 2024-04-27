import { ServerUrlService } from './server-url.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAssistance } from '../model/assistance.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssistanceService {

  private apiAssistanceUrl = this.serverUrlService.getBaseURL()+'assistance'

  constructor(private _httpClient: HttpClient, private serverUrlService: ServerUrlService) { }

  public getAllAssistance(): Observable<IAssistance[]>{
    return this._httpClient.get<IAssistance[]>(`${this.apiAssistanceUrl}`)
  }

  public registerAssistance(assistanceData: any): Observable<IAssistance> {
    return this._httpClient.post<IAssistance>(`${this.apiAssistanceUrl}`, assistanceData);
  }

}
