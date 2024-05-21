import { Component, OnInit } from '@angular/core';
import { dataShared } from '../../../../core/service/dataShared.service';

@Component({
  selector: 'app-auxiliary-info',
  standalone: true,
  imports: [],
  templateUrl: './auxiliary-info.component.html',
  styleUrl: './auxiliary-info.component.css'
})
export class AuxiliaryInfoComponent  implements OnInit{
  user: any;

  constructor(private _dataService: dataShared) { }

  ngOnInit() {
    this._dataService.objetoActual.subscribe((objeto: any) => this.user = objeto); 
  }
}
