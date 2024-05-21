// data.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class dataShared {
  private objetoSource = new BehaviorSubject<{ user: any, state: boolean } | null>(null);
  objetoActual = this.objetoSource.asObservable();

  constructor() { }

  enviarObjeto(objeto: any, state: boolean) {
    this.objetoSource.next({ user: objeto, state: state });
  }
}
