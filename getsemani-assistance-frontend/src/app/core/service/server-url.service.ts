import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServerUrlService {

  private hostURL = 'https://localhost:8443/';
  private baseURL = 'https://localhost:8443/api/';

  constructor() {}

  public getBaseURL(): string {
    return this.baseURL;
  }
  public getHostURL(): string {
    return this.hostURL;
  }

}
