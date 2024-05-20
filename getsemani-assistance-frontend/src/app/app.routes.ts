import { Routes } from '@angular/router';
import { StudentComponent } from './page/student/student.component';
import { AssistanceComponent } from './page/assistance/assistance.component';
import { LoginComponent } from './page/login/login.component';

export const routes: Routes = [
  {path: 'estudiantes', component: StudentComponent},
  {path: 'asistencia', component: AssistanceComponent},
  {path: 'login', component: LoginComponent}
];
