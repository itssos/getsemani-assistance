import { AssistanceService } from '../../../core/service/assistance.service';
import { Component, ViewChild} from '@angular/core';
import { QrCodeMainService } from '../../../core/service/qr-code-main.service';
import { QrCodeIndexService } from '../../../core/service/qr-code-index.service';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';
import { StudentService } from '../../../core/service/student.service';

@Component({
  selector: 'app-assistance',
  standalone: true,
  imports: [CommonModule, ModalComponent],
  templateUrl: './assistance.component.html',
  styleUrl: './assistance.component.css'
})
export class AssistanceComponent {

  modalData = {
    title: '',
    name: '',
    surname: ''
  }


  @ViewChild(ModalComponent, { static: false }) modalComponent: ModalComponent | null = null;

  constructor(private _studentService: StudentService, private qrCode: QrCodeMainService, private qrindex: QrCodeIndexService, private _assistanceService: AssistanceService) {
    this.qrCode.loadScript();
    this.qrindex.loadScript();
    window.addEventListener('message', this.receiveMessage.bind(this), false);
  }

  ngOnInit(): void {
    this.loadAllAssistance();
  }

  loadAllAssistance(): void {
    this._assistanceService.getAllAssistance().subscribe(data =>{
      console.log(data);
    });
  }

  receiveMessage(event: any) {
    if (event.data && event.data.type === 'qrCodeScanned') {
      const qrCodeValue = event.data.data;
      console.log('Código QR escaneado:', qrCodeValue);
      this.registerAssistance(qrCodeValue);
    }
  }

  registerAssistance(studentId: number): void {
    const assistanceData = {
      student: {
        id: studentId
      }
    };
    this.getStudentById(studentId)
    this._assistanceService.registerAssistance(assistanceData).subscribe(assistance => {
      console.log('Asistencia registrada:', assistance);
      this.openModal();
    });
  }

  getStudentById(studentId: number): void {
    this._studentService.getStudentById(studentId).subscribe(data =>{
      console.log(data);
      let student = data;
      this.modalData = {
        title: '¡Asistencia registrada!',
        name: student.name,
        surname: student.surname
      }
    });
  }

  openModal(): void {
    if (this.modalComponent) {
      this.modalComponent.openModal();
    }
  }

}
