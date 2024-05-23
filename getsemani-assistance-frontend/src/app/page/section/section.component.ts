import { Component } from '@angular/core';
import { SectionFormComponent } from '../../shared/component/section/section-form/section-form.component';
import { SectionListComponent } from '../../shared/component/section/section-list/section-list.component';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [SectionFormComponent, SectionListComponent],
  templateUrl: './section.component.html'
})
export class SectionComponent {

}
