import { Component } from '@angular/core';
import { QrScannerComponent } from '../../shared/component/assistance/qr-scanner/qr-scanner.component';
import { AssistanceListComponent } from '../../shared/component/assistance/assistance-list/assistance-list.component';

@Component({
  selector: 'app-assistance',
  standalone: true,
  imports: [QrScannerComponent,AssistanceListComponent],
  templateUrl: './assistance.component.html',
  styleUrl: './assistance.component.css'
})
export class AssistanceComponent {
  timeHour = new Date().getHours()
  timeMinute = new Date().getMinutes()
}
