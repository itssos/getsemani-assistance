import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../../core/auth/login.service';
import { UserService } from '../../../../core/service/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RolDirective } from '../../../../core/directive/rol.directive';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RolDirective],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  
  userName: string = '';
  
  constructor(
    private _loginService: LoginService,
    private _userService: UserService,
    private _jwtHelper: JwtHelperService
  ) { }

  ngOnInit(): void {
    this._loginService.currentUserData.subscribe((value: any) => {
      const token = value.toString();
      const decodedToken = this._jwtHelper.decodeToken(token);
      const userId: string = decodedToken.sub;
      
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
    });
  }
  
  logout(): void {
    this._loginService.logout();
  }
}
