import { Routes } from '@angular/router';
import { StudentComponent } from './page/student/student.component';
import { AssistanceComponent } from './page/assistance/assistance.component';
import { SidebarComponent } from './shared/component/sidebar/sidebar/sidebar.component';

export const routes: Routes = [
  {path: 'estudiantes', component: StudentComponent},
  {path: 'asistencia', component: AssistanceComponent},
  {path: 'sidebar', component: SidebarComponent}
];
