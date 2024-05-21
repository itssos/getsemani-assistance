import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerUrlService } from './server-url.service';
import { Observable } from 'rxjs';
import { ISection } from '../model/section.model';

@Injectable({
  providedIn: 'root'
})
export class SectionService {
  private apiUrl = this.serverUrlService.getBaseURL() + 'section'

  constructor(private _httpClient: HttpClient, private serverUrlService: ServerUrlService) {}

  public getAll(): Observable<ISection[]> {
    return this._httpClient.get<ISection[]>(this.apiUrl)
  }

  public getById(id: string): Observable<ISection> {
    return this._httpClient.get<ISection>(`${this.apiUrl}/${id}`)
  }

  public getByName(name: string): Observable<ISection> {
    return this._httpClient.get<ISection>(`${this.apiUrl}/name=${name}`)
  }

}
