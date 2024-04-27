import { IStudent } from './../../../../core/model/student.model';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { StudentService } from '../../../../core/service/student.service';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.css'
})
export class StudentFormComponent {
  constructor(private _formBuilder: FormBuilder, private _studentService: StudentService) {}

  newStudent: IStudent = {
    id: '',
    name: '',
    surname: '',
    grade: '',
    section: ''
  }

  formGroup = this._formBuilder.nonNullable.group({
    id: ['', Validators.required],
    name: ['', Validators.required],
    surname: ['', Validators.required],
    grade: ['', Validators.required],
    section: ['', Validators.required],
  })

  clickAdd(): void {
    if (this.formGroup.valid) {
      this.newStudent = this.formGroup.value as IStudent;

      this._studentService.saveStudent(this.newStudent)
      .subscribe({
        next: (data: IStudent) => {
          console.log('Datos enviados correctamente', data);
        },
        error:(err) => {
          console.error(err);
          this.formIsValid();
        }
      })
    } else {
      console.log('Error al enviar los datos:');
      this.formIsValid();
    }
  }

  fieldValidations: { [key: string]: string } = {
    id: 'idValid',
    name: 'nameValid',
    surname: 'surnameValid',
    grade: 'gradeValid',
    section: 'sectionValid'
  };

  nameValid = false;
  surnameValid = false;
  idValid = false;
  gradeValid = false;
  sectionValid = false;

  formIsValid() {
    Object.keys(this.formGroup.controls).forEach(field => {
      const control = this.formGroup.get(field);
      if (control) {
        const validationProperty = this.fieldValidations[field];
        (this as any)[validationProperty] = control.invalid;
      }
    });
  }


}
