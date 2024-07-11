import { Component, OnInit } from '@angular/core';
import { GraphicCircleComponent } from '../../../shared/component/dashboard/graphic-circle/graphic-circle.component';
import { GraphicBarComponent } from '../../../shared/component/dashboard/graphic-bar/graphic-bar.component';
import { AssistanceService } from '../../../core/service/assistance.service';
import { LoginService } from '../../../core/auth/login.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [GraphicCircleComponent,GraphicBarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements OnInit{
  studentsWithTardiness: any[] = [];
  assistances: any[] = [];
  constructor(
    private _assistanceService: AssistanceService,
    private _loginService: LoginService,
    private _jwtHelper: JwtHelperService
  ) {}

  ngOnInit(): void {
    this.idUser();
  }

  idUser(): void {
    this._loginService.currentUserData.subscribe((value: any) => {
      const token = value.toString();
      const decodedToken = this._jwtHelper.decodeToken(token);
      const userId: string = decodedToken.sub;

      if (userId) {
        this.fetchStudentsWithTardiness();
        this.fetchAssistances();
      }
    });
  }
  fetchStudentsWithTardiness(): void {
    this._assistanceService.getStudentsWithTardiness().subscribe(
      data => {
        this.studentsWithTardiness = data;     

      },
      (error) => {
        console.error('Error fetching students with tardiness:', error);
      }
    );
  }
  fetchAssistances(): void {
    this._assistanceService.getAssistancesByUser().subscribe(
      data => {
        this.assistances = data;
      },
      error => {
        console.error('Error fetching assistances:', error);
      }
    );
  }
}
