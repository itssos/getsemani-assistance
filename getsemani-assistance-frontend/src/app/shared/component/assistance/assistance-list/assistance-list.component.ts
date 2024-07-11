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
}
