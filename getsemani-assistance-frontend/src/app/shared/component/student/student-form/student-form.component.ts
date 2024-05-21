
import { IStudent } from './../../../../core/model/student.model'
import { Component, inject } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { StudentService } from '../../../../core/service/student.service'
import { IGrade } from '../../../../core/model/grade.model';
import { GradeService } from '../../../../core/service/grade.service';
import { SectionService } from '../../../../core/service/section.service';
import { ISection } from '../../../../core/model/section.model';
import { EducationLevelService } from '../../../../core/service/education_level.service';
import { IEducationLevel } from '../../../../core/model/education_level.model';
import { IStudentBackend } from '../../../../core/model/student_backend.model';
import { forkJoin } from 'rxjs';
import { SweetAlert } from '../../../../core/service/sweetAlert.service';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.css'
})
export class StudentFormComponent {
  constructor(
    private _formBuilder: FormBuilder,
    private _studentService: StudentService,
    private _gradeService: GradeService,
    private _sectionService: SectionService,
    private _educationLevelService: EducationLevelService,
    private _sweetAlert: SweetAlert
  ) {}

  ngOnInit(): void {
    // this.loadGrades()
    // this.loadSections()
    this.loadEducationLevel()
  }

  grades: IGrade[] = []
  sections: ISection[] = []
  educationLevels: IEducationLevel[] = []

  loadEducationLevel():void{
    this._educationLevelService.getAll().subscribe({
      next: (data: IEducationLevel[]) => {
        this.educationLevels = data;
      },
      error:(err) => {
        console.log(err);
      },
    })
  }

  onEducationLevelChange(): void {
    this.formGroup.controls.grade.setValue('')
    this.formGroup.controls.section.setValue('')
    const selectedEducationLevelId = Number(this.formGroup.controls.education_level.value);
    const selectedEducationLevel = this.educationLevels.find(el => el.id === selectedEducationLevelId);
    if (selectedEducationLevel) {
      this.loadGrades(selectedEducationLevel.maxGrade);
      this.loadSections(selectedEducationLevel.maxSection);
    } else {
      this.grades = [];
      this.sections = [];
    }
  }

  loadGrades(maxGrade: number): void {
    this._gradeService.getAll().subscribe({
      next: (data: IGrade[]) => {
        this.grades = data.filter(grade => grade.id <= maxGrade);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  loadSections(maxSection: number): void {
    this._sectionService.getAll().subscribe({
      next: (data: ISection[]) => {
        this.sections = data.filter(section => section.id <= maxSection);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  newStudent: IStudent = {
    id: '',
    name: '',
    surname: '',
    dni: '',
    grade: '',
    section: '',
    education_level: '',
    state: 'ACTIVO'
  }

  newStudentBackend: IStudentBackend = {
    id: '',
    name: '',
    surname: '',
    dni: '',
    grade: {id: 0, name: ''},
    section: {id: 0, name: ''},
    educationLevel: {id: 0, name: '', maxGrade: 0, maxSection: 0},
    state: ''
  }

  formGroup = this._formBuilder.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    dni: ['', Validators.required],
    grade: ['', Validators.required],
    section: ['', Validators.required],
    education_level: ['', Validators.required],
    state: ['ACTIVO', Validators.required]
  })

  clickAdd(): void {
    if (this.formGroup.valid) {
      this.newStudent = this.formGroup.value as IStudent;
      this.newStudentBackend.name = this.newStudent.name;
      this.newStudentBackend.surname = this.newStudent.surname;
      this.newStudentBackend.dni = this.newStudent.dni;
      this.newStudentBackend.state = this.newStudent.state;

      const grade$ = this._gradeService.getById(this.newStudent.grade);
      const section$ = this._sectionService.getById(this.newStudent.section);
      const educationLevel$ = this._educationLevelService.getById(this.newStudent.education_level);

      forkJoin([grade$, section$, educationLevel$]).subscribe({
        next: ([gradeData, sectionData, educationLevelData]) => {
          this.newStudentBackend.grade = gradeData;
          this.newStudentBackend.section = sectionData;
          this.newStudentBackend.educationLevel = educationLevelData;

          this._studentService.saveStudent(this.newStudentBackend)
            .subscribe({
              next: (data: IStudentBackend) => {
                this.resetForm()
                this._sweetAlert.showAlert()
              },
              error: (err) => {
                console.error(err);
                this.formIsValid();
              }
            });
        },
        error: (err) => {
          console.error('Error fetching dependencies', err);
          // Handle errors if necessary
        }
      });
    } else {
      this.formIsValid();
    }
  }

  fieldValidations: { [key: string]: string } = {
    name: 'nameValid',
    surname: 'surnameValid',
    dni: 'dniValid',
    grade: 'gradeValid',
    section: 'sectionValid',
    education_level: 'educationLevelValid',
  }

  nameValid = false
  surnameValid = false
  dniValid = false
  gradeValid = false
  sectionValid = false
  educationLevelValid = false

  formIsValid() {
    Object.keys(this.formGroup.controls).forEach(field => {
      const control = this.formGroup.get(field);
      if (control) {
        const validationProperty = this.fieldValidations[field];
        (this as any)[validationProperty] = control.invalid;
      }
    });
  }

  resetForm(): void {
    this.formGroup.reset({
      name: '',
      surname: '',
      dni: '',
      grade: '',
      section: '',
      education_level: '',
      state: 'ACTIVO'
    });
    this.nameValid = false;
    this.surnameValid = false;
    this.dniValid = false;
    this.gradeValid = false;
    this.sectionValid = false;
    this.educationLevelValid = false;
  }


}
