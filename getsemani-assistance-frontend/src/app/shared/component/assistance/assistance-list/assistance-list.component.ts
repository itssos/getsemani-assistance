import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AssistanceService } from '../../../../core/service/assistance.service';
import { GradeService } from '../../../../core/service/grade.service';
import { SectionService } from '../../../../core/service/section.service';
import { EducationLevelService } from '../../../../core/service/education_level.service';
import { IEducationLevel } from '../../../../core/model/education_level.model';
import { ISection } from '../../../../core/model/section.model';
import { IGrade } from '../../../../core/model/grade.model';
import { IAssistance } from '../../../../core/model/assistance.model';
import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';
import * as ExcelJS from 'exceljs';

@Component({
  selector: 'app-assistance-list',
  standalone: true,
  templateUrl: './assistance-list.component.html',
  imports: [ReactiveFormsModule],
  styleUrls: ['./assistance-list.component.css']
})
export class AssistanceListComponent implements OnInit, OnDestroy {
  private refreshIntervalSubscription: Subscription = new Subscription();
  assistanceList: IAssistance[] = [];
  educationLevels: IEducationLevel[] = [];
  grades: IGrade[] = [];
  sections: ISection[] = [];

  formGroup = this._formBuilder.group({
    education: ['', Validators.required],
    grade: ['', Validators.required],
    section: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required]
  });

  constructor(
    private _formBuilder: FormBuilder,
    private _assistanceService: AssistanceService,
    private _gradeService: GradeService,
    private _sectionService: SectionService,
    private _educationLevelService: EducationLevelService
  ) {}

  ngOnInit(): void {
    this.loadEducationLevel();
  }

  ngOnDestroy(): void {
    this.refreshIntervalSubscription.unsubscribe();
  }

  loadEducationLevel(): void {
    this._educationLevelService.getAll().subscribe({
      next: (data: IEducationLevel[]) => {
        this.educationLevels = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onEducationLevelChange(): void {
    const selectedEducationLevelId = this.formGroup.get('education')?.value;
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

  loadFilteredAssistance(): void {
    const education = this.formGroup.get('education')?.value;
    const startDate = this.formGroup.get('startDate')?.value;
    const endDate = this.formGroup.get('endDate')?.value;

    if (education && startDate && endDate) {
      const formattedStartDate = this.formatDate1(startDate);
      const formattedEndDate = this.formatDate2(endDate);

      this._assistanceService.getFilteredAssistance(
        education, this.formGroup.get('grade')?.value || '', this.formGroup.get('section')?.value || '',
        formattedStartDate, formattedEndDate
      ).subscribe({
        next: (assistances: IAssistance[]) => {
          this.assistanceList = assistances.map(assistance => ({
            ...assistance,
            date: new Date(assistance.date as Date)
          }));
        },
        error: err => {
          console.error('Error loading filtered assistances', err);
        }
      });
    }
  }

  onFiltersChanged(): void {
    if (this.formGroup.valid) {
      this.loadFilteredAssistance();
    }
  }

  formatDate1(date: string | null | undefined): string {
    if (!date) return '';
    const [yyyy, mm, dd] = date.split('-');
    return `${yyyy}-${mm}-${dd}T00:00:00`;
  }
  formatDate2(date: string | null | undefined): string {
    if (!date) return '';
    const [yyyy, mm, dd] = date.split('-');
    return `${yyyy}-${mm}-${dd}T23:59:59`;
  }

  generatePDF(){
    const assistanceTable: any = document.getElementById('assistanceTable')

    const education = this.formGroup.get('education')?.value;
    const startDate = this.formGroup.get('startDate')?.value;
    const grade = this.formGroup.get('grade')?.value
    const section = this.formGroup.get('section')?.value
    const endDate = this.formGroup.get('endDate')?.value;
    const formattedStartDate = this.formatDate1(startDate);
    const formattedEndDate = this.formatDate2(endDate);


    html2canvas(assistanceTable, { scale: 2 }).then((canvas) => {
      const pdf = new jsPDF();
      const imgHeight = canvas.height * 211 / canvas.width; // Ajusta 208 según el ancho de la página PDF
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 211, imgHeight);
      pdf.save(`asistencias_${education}_${grade}${section}_${startDate}-${endDate}.pdf`);
    });

  }

  exportToExcel() {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Asistencias');

    // Headers
    const headers = ['Estudiante', 'Registrador', 'Fecha', 'Hora', 'Estado'];
    worksheet.addRow(headers);

    // Data rows
    this.assistanceList.forEach(assistance => {
      const row = [
        `${assistance.student.surname} ${assistance.student.name}`,
        `${assistance.user.surname} ${assistance.user.name}`,
        assistance.date?.toLocaleDateString('es-ES', {
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: '2-digit'
        }),
        assistance.date?.toLocaleTimeString(),
        assistance.state
      ];
      worksheet.addRow(row);
    });

    // Auto-size columns
    worksheet.columns.forEach(column => {
      let maxColumnLength = 0;
      column.eachCell!((cell, rowNumber) => {
        const columnLength = cell.value ? cell.value.toString().length : 10;
        if (columnLength > maxColumnLength) {
          maxColumnLength = columnLength;
        }
      });
      column.width = maxColumnLength < 50 ? 50 : maxColumnLength;
    });

    // Guardar el archivo Excel
    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `asistencias_${new Date().toISOString()}.xlsx`;
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    });
  }


}
