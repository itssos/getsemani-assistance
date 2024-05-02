import { Component } from '@angular/core';
import { QrScannerComponent } from '../../shared/component/assistance/qr-scanner/qr-scanner.component';

@Component({
  selector: 'app-assistance',
  standalone: true,
  imports: [QrScannerComponent],
  templateUrl: './assistance.component.html',
  styleUrl: './assistance.component.css'
})
export class AssistanceComponent {

}
