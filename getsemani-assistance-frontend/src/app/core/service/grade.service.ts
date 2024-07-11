import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerUrlService } from './server-url.service';
import { Observable } from 'rxjs';
import { IGrade } from '../model/grade.model';

@Injectable({
  providedIn: 'root'
})
export class GradeService {
  private apiUrl = this.serverUrlService.getBaseURL() + 'grade'

  constructor(private _httpClient: HttpClient, private serverUrlService: ServerUrlService) {}

  public getAll(): Observable<IGrade[]> {
    return this._httpClient.get<IGrade[]>(this.apiUrl)
  }

  public getById(id: string): Observable<IGrade> {
    return this._httpClient.get<IGrade>(`${this.apiUrl}/${id}`)
  }

  public getByName(name: string): Observable<IGrade> {
    return this._httpClient.get<IGrade>(`${this.apiUrl}/name=${name}`)
  }

  public save(grade: IGrade): Observable<IGrade> {
    return this._httpClient.post<IGrade>(`${this.apiUrl}`, grade)
  }

  public update(grade: IGrade): Observable<IGrade> {
    return this._httpClient.put<IGrade>(`${this.apiUrl}`, grade)
  }

}
