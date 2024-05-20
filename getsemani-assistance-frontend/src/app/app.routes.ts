import { Routes } from '@angular/router';
import { StudentComponent } from './page/student/student.component';
import { AssistanceComponent } from './page/assistance/assistance.component';
import { LoginComponent } from './page/login/login.component';
import { MainComponent } from './layout/main/main.component';
import { EmptyComponent } from './layout/empty/empty.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'estudiantes', component: StudentComponent },
      { path: 'asistencia', component: AssistanceComponent }
    ]
  },
  {
    path: '',
    component: EmptyComponent,
    children: [
      { path: 'login', component: LoginComponent }
    ]
  }
];
