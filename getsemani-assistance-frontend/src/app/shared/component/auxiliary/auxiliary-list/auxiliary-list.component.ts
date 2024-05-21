import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../../../core/service/user.service';
import { SweetAlert } from '../../../../core/service/sweetAlert.service';
import { dataShared } from '../../../../core/service/dataShared.service';

@Component({
  selector: 'app-auxiliary-list',
  standalone: true,
  imports: [],
  templateUrl: './auxiliary-list.component.html',
  styleUrl: './auxiliary-list.component.css'
})

export class AuxiliaryListComponent implements OnInit {
  constructor(private _userService:UserService,private _dataService:dataShared ){}

  userss:any []=[]

  
  ngOnInit(): void {
    this._userService.getAllUser().subscribe((users: any[]) => {
      this.userss = users.filter(user => user.rol === 'AUXILIAR');
      console.log(this.userss);

    });


  }
  pasarUser(user:any,estate:boolean){
    this._dataService.enviarObjeto(user,estate);
  }
}
