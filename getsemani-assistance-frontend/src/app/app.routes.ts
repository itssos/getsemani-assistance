import { Routes } from '@angular/router';
import { AssistanceComponent } from './shared/component/assistance/assistance.component';
import { StudentComponent } from './page/student/student.component';

export const routes: Routes = [
  {path: 'estudiantes', component: StudentComponent},
  {path: 'asistencia', component: AssistanceComponent}
];
