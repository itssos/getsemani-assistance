import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../../../core/service/user.service';

@Component({
  selector: 'app-auxiliary-list',
  standalone: true,
  imports: [],
  templateUrl: './auxiliary-list.component.html',
  styleUrl: './auxiliary-list.component.css'
})
export class AuxiliaryListComponent implements OnInit {
  private userService=inject(UserService);
  private users:any []=[]
  ngOnInit(): void {
    this.userService.getAllUser().subscribe((users:any)=> this.users=users)
  }
}
