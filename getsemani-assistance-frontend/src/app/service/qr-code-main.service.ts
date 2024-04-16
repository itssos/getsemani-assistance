// qr-code-main.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QrCodeMainService {

  constructor() {}

  public loadScript(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const node = document.createElement('script');
      node.src = 'assets/js/qrCode.min.js';
      node.type = 'text/javascript';
      node.async = true;
      node.onload = () => {
        resolve();
      };
      node.onerror = (error) => {
        reject(error);
      };
      document.getElementsByTagName('head')[0].appendChild(node);
    });
  }
}
