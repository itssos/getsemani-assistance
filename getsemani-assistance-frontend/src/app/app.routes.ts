import { Routes } from '@angular/router';
import { StudentComponent } from './page/student/student.component';
import { AssistanceComponent } from './page/assistance/assistance.component';
import { CrudgradeComponent } from './shared/component/crudgrade/crudgrade.component';
import { AuxiliaryComponent } from './page/auxiliary/auxiliary.component';

export const routes: Routes = [
  {path: 'estudiantes', component: StudentComponent},
  {path: 'asistencia', component: AssistanceComponent},
  {path: 'crudgrade', component: CrudgradeComponent},
  {path: 'auxiliar', component: AuxiliaryComponent}
];
