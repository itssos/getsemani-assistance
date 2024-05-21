import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerUrlService } from './server-url.service';
import { Observable } from 'rxjs';
import { IGrade } from '../model/grade.model';
import { IEducationLevel } from '../model/education_level.model';

@Injectable({
  providedIn: 'root'
})
export class EducationLevelService {
  private apiUrl = this.serverUrlService.getBaseURL() + 'education_level'

  constructor(private _httpClient: HttpClient, private serverUrlService: ServerUrlService) {}

  public getAll(): Observable<IEducationLevel[]> {
    return this._httpClient.get<IEducationLevel[]>(this.apiUrl)
  }

  public getById(id: string): Observable<IEducationLevel> {
    return this._httpClient.get<IEducationLevel>(`${this.apiUrl}/${id}`)
  }

  public getByName(name: string): Observable<IEducationLevel> {
    return this._httpClient.get<IEducationLevel>(`${this.apiUrl}/name=${name}`)
  }

}
