import { Component } from '@angular/core';
import { StudentListComponent } from '../../shared/component/student/student-list/student-list.component';
import { StudentFormComponent } from '../../shared/component/student/student-form/student-form.component';
import { FileUploadComponent } from '../../shared/component/student/student-excel/student-excel.component';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [
    StudentListComponent,
    StudentFormComponent,
    FileUploadComponent
  ],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent {


}
