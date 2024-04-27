import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServerUrlService {

  private baseURL = 'https://192.168.1.105:8443/api/';

  constructor() {}

  public getBaseURL(): string {
    return this.baseURL;
  }

}
