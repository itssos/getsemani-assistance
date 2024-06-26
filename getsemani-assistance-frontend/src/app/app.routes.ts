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

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate:[authGuard],
    children: [
      { path: 'estudiantes', component: StudentComponent},
      { path: 'asistencia', component: AssistanceComponent },
      { path: 'auxiliar', component: AuxiliaryComponent },
      { path: 'seccion', component: SectionComponent }
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
