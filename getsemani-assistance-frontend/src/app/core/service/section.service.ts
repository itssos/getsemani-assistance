import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerUrlService } from './server-url.service';
import { catchError, Observable, throwError } from 'rxjs';
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

  public saveSection(section: ISection): Observable<ISection> {
    return this._httpClient.post<ISection>(`${this.apiUrl}`, section).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An error occurred while saving the student.'
        if (error.error && error.error.errors) {
          errorMessage = error.error.errors.join('\n')
        }
        return throwError(() => new Error(errorMessage))
      })
    )
  }

  public updateSection(section: ISection): Observable<ISection> {
    return this._httpClient.put<ISection>(`${this.apiUrl}`, section).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An error occurred while saving the student.'
        if (error.error && error.error.errors) {
          errorMessage = error.error.errors.join('\n')
        }
        return throwError(() => new Error(errorMessage))
      })
    )
  }

}
