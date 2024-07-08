import { ISection } from './../../core/model/section.model';
import { Component } from '@angular/core';
import { SectionService } from '../../core/service/section.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './section.component.html'
})
export class SectionComponent {
  sectionList: ISection[] = [];

  formGroup = this._formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(1)]]
  });
  selectedSectionId = 0
  nameValid = false;

  constructor(
    private _sectionService: SectionService,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadSections();
  }

  loadSections() {
    this._sectionService.getAll().subscribe({
      next: (sections: ISection[]) => {
        this.sectionList = sections;
      },
      error: (error) => {
        console.error('Error loading sections', error);
      },
    });
  }

  saveSection() {
    if (this.formGroup.valid) {
      const sectionData = this.formGroup.value as ISection;

      if (this.selectedSectionId) {
        sectionData.id = this.selectedSectionId;
        this._sectionService.updateSection(sectionData as ISection).subscribe({
          next: (updatedSection: ISection) => {
            const index = this.sectionList.findIndex(s => s.id === updatedSection.id);
            if (index !== -1) {
              this.sectionList[index] = updatedSection;
            }
            this.formGroup.reset();
            this.selectedSectionId = 0;
          },
          error: (error) => {
            console.error('Error updating section', error);
          },
        });
      } else {
        this._sectionService.saveSection(sectionData as ISection).subscribe({
          next: (savedSection: ISection) => {
            this.sectionList.push(savedSection);
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

  editSection(section: ISection) {
    const sectionId = section.id;
    this.formGroup.patchValue({
      name: section.name
    });

    this.selectedSectionId = sectionId;
  }

}
