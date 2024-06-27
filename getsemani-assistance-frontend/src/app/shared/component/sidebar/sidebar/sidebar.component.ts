import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../../core/auth/login.service';
import { UserService } from '../../../../core/service/user.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{
  
  userName: string = '';
  constructor(private _loginService: LoginService,private _userService:UserService) { }

  ngOnInit(): void {
    const userId = this._loginService.getUserIdFromToken(); 
    console.log("code:"+userId);
    if (userId) {
      this._userService.getIdUser(userId).subscribe(
        (user: any) => {
          this.userName = `${user.name} ${user.surname}`;
        },
        (error) => {
          console.error('Error al obtener detalles del usuario', error);
        }
      );
    }
  }
  
  logout():void{
    this._loginService.logout();
  }
}
