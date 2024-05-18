import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/component/navbar/navbar.component';
import { initFlowbite } from 'flowbite';
import { SidebarComponent } from './shared/component/sidebar/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SidebarComponent,RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  ngOnInit(): void {
    initFlowbite();
  }
}
