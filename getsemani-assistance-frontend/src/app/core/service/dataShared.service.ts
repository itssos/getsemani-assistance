// data.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class dataShared {
    private objetoSource = new BehaviorSubject<any>(null);
    objetoActual = this.objetoSource.asObservable();
  
    constructor() { }
  
    enviarObjeto(objeto: any) {
      this.objetoSource.next(objeto);
    }
}
