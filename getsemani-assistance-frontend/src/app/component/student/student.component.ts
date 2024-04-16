import { Component } from '@angular/core';
import { StudentService } from '../../service/student.service';
import { IStudent } from '../../model/student.model';
import { NgFor } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [NgFor],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent {

  studentList: IStudent[] = []
  newStudent: IStudent = {
    id: 0,
    name: '',
    surname: '',
    grade: 0,
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
