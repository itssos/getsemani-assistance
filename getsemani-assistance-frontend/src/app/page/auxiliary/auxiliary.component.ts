import { Component, OnInit, inject } from '@angular/core';
import { AuxiliaryFormComponent } from '../../shared/component/auxiliary/auxiliary-form/auxiliary-form.component';
import { AuxiliaryListComponent } from '../../shared/component/auxiliary/auxiliary-list/auxiliary-list.component';

@Component({
  selector: 'app-auxiliary',
  standalone: true,
  imports: [AuxiliaryFormComponent,AuxiliaryListComponent],
  templateUrl: './auxiliary.component.html',
  styleUrl: './auxiliary.component.css'
})
export class AuxiliaryComponent  {
}
