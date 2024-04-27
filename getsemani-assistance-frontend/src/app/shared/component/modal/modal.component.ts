import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {

  @Input() title: string = '';
  @Input() description: string = '';
  @Input() img: string = '';

  showModal: boolean = false;
  openModal(): void {
    this.showModal = true;
  }
  closeModal(): void {
    this.showModal = false;
  }
  stopPropagation(event: Event): void {
    event.stopPropagation();
  }
}
