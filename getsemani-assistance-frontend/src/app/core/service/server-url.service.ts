import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServerUrlService {

  private hostURL = 'https://192.168.1.107:8443/';
  private baseURL = 'https://192.168.1.107:8443/api/';
  constructor() {}

  public getBaseURL(): string {
    return this.baseURL;
  }
  public getHostURL(): string {
    return this.hostURL;
  }

}
