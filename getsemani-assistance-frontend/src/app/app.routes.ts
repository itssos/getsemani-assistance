import { Routes } from '@angular/router';
import { StudentComponent } from './component/student/student.component';
import { AssistanceComponent } from './component/assistance/assistance.component';

export const routes: Routes = [
  {path: 'estudiantes', component: StudentComponent},
  {path: 'asistencia', component: AssistanceComponent}
];
