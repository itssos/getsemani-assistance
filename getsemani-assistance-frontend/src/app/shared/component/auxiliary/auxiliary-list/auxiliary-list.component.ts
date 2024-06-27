import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { UserService } from '../../../../core/service/user.service';
import { SweetAlert } from '../../../../core/service/sweetAlert.service';
import { dataShared } from '../../../../core/service/dataShared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auxiliary-list',
  standalone: true,
  imports: [],
  templateUrl: './auxiliary-list.component.html',
  styleUrl: './auxiliary-list.component.css'
})

export class AuxiliaryListComponent implements OnInit,OnDestroy   {
  
  reloadListSubscription: Subscription;
  userss:any []=[]

  constructor(private _userService:UserService,private _sharedState:dataShared ){
    this.reloadListSubscription = this._sharedState.reloadList$.subscribe((reload: boolean) => {
      if (reload) {
        this.ngOnInit();
      }
    });
  }

  ngOnDestroy() {
    this.reloadListSubscription.unsubscribe(); 
  }
  
  ngOnInit(): void {
    this._userService.getAllUser().subscribe((users: any[]) => {
      this.userss = users.filter(user => user.rol === 'AUXILIAR');
      console.log(this.userss);
    });


  }
  pasarUser(user:any,estate:boolean){
    this._sharedState.enviarObjeto(user,estate);
  }

  
}
