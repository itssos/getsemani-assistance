import { Component } from '@angular/core';
import { FormBuilder, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { IStudent } from '../../../../core/model/student.model';
import { StudentService } from '../../../../core/service/student.service';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent {
  studentList: IStudent[] = []
  isLoadingTable: boolean = false

  constructor(private _formBuilder: FormBuilder, private _studentService: StudentService){}

  formGroup = this._formBuilder.nonNullable.group({
    grade: ['', Validators.required],
    section: ['', Validators.required]
  })

  ngOnInit(): void {
    //this.loadStudentsByGradeAndSection("5", "A")
  }

  loadStudents(): void {
    this._studentService.getAllStudents().subscribe(data =>{
      this.studentList = data;
    });
  }

  loadStudentsByGradeAndSection(grade: string, section: string):void{
    if (this.formGroup.valid) {
      this.studentList = []
      this.isLoadingTable = true
      this._studentService.getStudentsByGradeAndSection(grade, section).subscribe({
        next: (data: IStudent[]) => {
          this.isLoadingTable = false
          this.studentList = data;
        },
        error:(err) => {
          console.log(err);
          this.isLoadingTable = false
        },
      })
    }
  }


}
