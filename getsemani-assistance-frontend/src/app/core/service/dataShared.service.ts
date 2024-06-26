// data.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class dataShared {
  private objetoSource = new BehaviorSubject<{ user: any, state: boolean } | null>(null);
  private reloadListSubject = new Subject<boolean>();
  objetoActual = this.objetoSource.asObservable();
  reloadList$ = this.reloadListSubject.asObservable();
  constructor() { }

  enviarObjeto(objeto: any, state: boolean) {
    this.objetoSource.next({ user: objeto, state: state });
  }
  triggerReloadList() {
    this.reloadListSubject.next(true);
  } 
}
