import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IStudentBackend } from '../../../../core/model/student_backend.model';
import { StudentService } from '../../../../core/service/student.service';
import { GradeService } from '../../../../core/service/grade.service';
import { SectionService } from '../../../../core/service/section.service';
import { EducationLevelService } from '../../../../core/service/education_level.service';
import { IEducationLevel } from '../../../../core/model/education_level.model';
import { IGrade } from '../../../../core/model/grade.model';
import { ISection } from '../../../../core/model/section.model';
import { QRCodeModule } from 'angularx-qrcode';
import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [ReactiveFormsModule, QRCodeModule],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent {
  studentList: IStudentBackend[] = []
  isLoadingTable: boolean = false
  grades: IGrade[] = []
  sections: ISection[] = []
  educationLevels: IEducationLevel[] = []

  constructor(
    private _formBuilder: FormBuilder,
    private _studentService: StudentService,
    private _gradeService: GradeService,
    private _sectionService: SectionService,
    private _educationLevelService: EducationLevelService
  ){}

  formGroup = this._formBuilder.nonNullable.group({
    grade: ['', Validators.required],
    section: ['', Validators.required],
    education_level: ['', Validators.required]
  })

  ngOnInit(): void {
    this.loadEducationLevel()
  }

  loadStudentsByEducationLevelAndGradeAndSection(educationLevel: string, grade: string, section: string):void{
    if (this.formGroup.valid) {
      this.studentList = []
      this.isLoadingTable = true
      this._studentService.getByEducationLevelAndGradeAndSection(educationLevel, grade, section).subscribe({
        next: (data: IStudentBackend[]) => {
          this.isLoadingTable = false
          this.studentList = data;
          console.log(educationLevel+grade+section);
          console.log(data);
        },
        error:(err) => {
          console.log(err);
          this.isLoadingTable = false
        },
      })
    }
  }

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
    const selectedEducationLevelId = this.formGroup.controls.education_level.value;
    const selectedEducationLevel = this.educationLevels.find(el => el.name === selectedEducationLevelId);
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

  gradeValid = false
  sectionValid = false
  educationLevelValid = false

  downloadQR(studentId: string): void {
    const canvas = document.querySelector(`#qr-${studentId} canvas`);
    if (canvas) {
      const dataURL = (canvas as HTMLCanvasElement).toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = `qr-code-${studentId}.png`;
      link.click();
    } else {
      console.error(`Canvas not found for studentId ${studentId}`);
    }
  }

  generatePDF(studentId: string) {
    const studentCarnet: any = document.getElementById(`studentCarnet-${studentId}`);
    if (studentCarnet) {
      html2canvas(studentCarnet, { scale: 2 }).then((canvas) => {
        const pdf = new jsPDF();
        const imgHeight = canvas.height * 70 / canvas.width;
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 10, 10, 70, imgHeight);
        pdf.save(`carnet-${studentId}.pdf`);
      });
    } else {
      console.error(`Element with ID studentCarnet-${studentId} not found`);
    }
  }

}
