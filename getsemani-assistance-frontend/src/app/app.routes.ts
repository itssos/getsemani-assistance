import { Routes } from '@angular/router';
import { StudentComponent } from './page/student/student.component';
import { AssistanceComponent } from './page/assistance/assistance.component';
import { LoginComponent } from './page/login/login.component';
import { MainComponent } from './layout/main/main.component';
import { EmptyComponent } from './layout/empty/empty.component';
import { AuxiliaryComponent } from './page/auxiliary/auxiliary.component';
import { NotFound404Component } from './page/not-found404/not-found404.component';
import { SectionComponent } from './page/section/section.component';
import { authGuard } from './core/guards/auth.guard';
import { loginGuard } from './core/guards/login.guard';
import { RoleGuard } from './core/guards/role.guard';
import { DashboardComponent } from './page/dashboard/dashboard/dashboard.component';
import { GradeComponent } from './page/grade/grade.component';


export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate:[authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent,canActivate:[RoleGuard],data:{allowedRoles:['ADMIN','AUXILIAR']}},
      { path: 'estudiantes', component: StudentComponent,canActivate:[RoleGuard],data:{allowedRoles:['ADMIN','AUXILIAR']}},
      { path: 'asistencia', component: AssistanceComponent,canActivate:[RoleGuard],data:{allowedRoles:['ADMIN','AUXILIAR']} },
      { path: 'auxiliar', component: AuxiliaryComponent,canActivate:[RoleGuard],data:{allowedRoles:['ADMIN']} },
      { path: 'seccion', component: SectionComponent,canActivate:[RoleGuard],data:{allowedRoles:['ADMIN']} },
      { path: 'grado', component: GradeComponent,canActivate:[RoleGuard],data:{allowedRoles:['ADMIN']} },
    ]
  },
  {
    path: '',
    component: EmptyComponent,
    canActivate:[loginGuard],
    children: [
      { path: 'login', component: LoginComponent }
    ]
  },
  {
    path: '**',
    component: NotFound404Component
  }
];
