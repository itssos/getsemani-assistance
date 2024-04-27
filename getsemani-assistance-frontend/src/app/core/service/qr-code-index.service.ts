import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QrCodeIndexService {

  constructor() { }
  public loadScript() {
    console.log('QrCode index loading...')
    let node = document.createElement('script');
    node.src = 'assets/js/indexQrCode.js';
    node.type = 'text/javascript';
    node.async = true;
    document.getElementsByTagName('head')[0].appendChild(node);
  }

}
