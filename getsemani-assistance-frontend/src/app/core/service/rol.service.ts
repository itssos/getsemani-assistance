import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ServerUrlService } from './server-url.service'
import { Observable,throwError } from 'rxjs';
import { IRol } from '../model/rol.model';

@Injectable({
    providedIn:'root'
})

export class RolService{

    private apiRolUrl = this.serverUrlService.getBaseURL()+'roles'
    
    constructor(private _httpClient: HttpClient, private serverUrlService: ServerUrlService) {}

    public getAllRol():Observable<IRol[]>{
        return this._httpClient.get<IRol[]>(this.apiRolUrl)
    }

}
