import { Component } from '@angular/core';
import { SidebarComponent } from '../../shared/component/sidebar/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from '../../page/login/login.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet,SidebarComponent,LoginComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
