import { Component } from '@angular/core';
import { LoginService } from '../../../../core/auth/login.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(private loginService: LoginService) { }

  logout():void{
    this.loginService.logout();
  }
}
