import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { NgForm } from '@angular/forms';
import { IStudent } from '../../../../core/model/student.model';
import { StudentService } from '../../../../core/service/student.service';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent {
  studentList: IStudent[] = []
  newStudent: IStudent = {
    id: '',
    name: '',
    surname: '',
    grade: '',
    section: ''
  }

  constructor(private _studentService: StudentService){}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this._studentService.getAllStudents().subscribe(data =>{
      console.log(data);
      this.studentList = data;
    });
  }

  saveStudent(form: NgForm): void {
    if (form.valid) {
      this._studentService.saveStudent(this.newStudent).subscribe(savedStudent => {
        console.log('Estudiante guardado:', savedStudent);
        this.loadStudents();
        form.resetForm();
      });
    } else {
      console.log('Formulario inválido');
    }
  }

}
