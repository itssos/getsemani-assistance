import { ServerUrlService } from './server-url.service';
import { HttpClient } from '@angular/common/http';
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

  public registerAssistance(assistance: IAssistance): Observable<IAssistance> {
    return this._httpClient.post<IAssistance>(`${this.apiUrl}`, assistance);
  }

}
