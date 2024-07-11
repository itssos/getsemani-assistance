import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IGrade } from '../../core/model/grade.model';
import { GradeService } from '../../core/service/grade.service';

@Component({
  selector: 'app-grade',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './grade.component.html'
})
export class GradeComponent {
  gradeList: IGrade[] = [];

  formGroup = this._formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(1)]]
  });
  selectedGradeId = 0
  nameValid = false;

  constructor(
    private _gradeService: GradeService,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadGrades();
  }

  loadGrades() {
    this._gradeService.getAll().subscribe({
      next: (grades: IGrade[]) => {
        this.gradeList = grades;
      },
      error: (error) => {
        console.error('Error loading sections', error);
      },
    });
  }

  saveGrade() {
    if (this.formGroup.valid) {
      const gradeData = this.formGroup.value as IGrade;

      if (this.selectedGradeId) {
        gradeData.id = this.selectedGradeId;
        this._gradeService.update(gradeData as IGrade).subscribe({
          next: (updatedGrade: IGrade) => {
            const index = this.gradeList.findIndex(s => s.id === updatedGrade.id);
            if (index !== -1) {
              this.gradeList[index] = updatedGrade;
            }
            this.formGroup.reset();
            this.selectedGradeId = 0;
          },
          error: (error) => {
            console.error('Error updating section', error);
          },
        });
      } else {
        this._gradeService.save(gradeData as IGrade).subscribe({
          next: (savedSection: IGrade) => {
            this.gradeList.push(savedSection);
            this.formGroup.reset();
          },
          error: (error) => {
            console.error('Error saving section', error);
          },
        });
      }
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

  edit(grade: IGrade) {
    const gradeId = grade.id;
    this.formGroup.patchValue({
      name: grade.name
    });

    this.selectedGradeId = gradeId;
  }
}
