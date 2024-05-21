import { Component, ViewChild } from '@angular/core';
import { ZXingScannerComponent, ZXingScannerModule } from '@zxing/ngx-scanner';
import { BarcodeFormat} from '@zxing/library';
import { BehaviorSubject } from 'rxjs';
import { IStudentBackend } from '../../../../core/model/student_backend.model';
import { StudentService } from '../../../../core/service/student.service';
import { AssistanceService } from '../../../../core/service/assistance.service';
import { IAssistance } from '../../../../core/model/assistance.model';
import { IUser } from '../../../../core/model/user.model';
import { SweetAlert } from '../../../../core/service/sweetAlert.service';

@Component({
  selector: 'app-qr-scanner',
  standalone: true,
  imports: [ZXingScannerModule],
  templateUrl: './qr-scanner.component.html',
  styleUrl: './qr-scanner.component.css'
})
export class QrScannerComponent {

  constructor(
    private _studentService: StudentService,
    private _assistanceService: AssistanceService,
    private _sweetAlert: SweetAlert
  ){}

  @ViewChild('scanner')
  scanner!: ZXingScannerComponent;

  cameraShow = false;

  title = 'getsemani-assistance';
  scannerEnabled = false

  studentQr: IStudentBackend = {
    id: '',
    name: '',
    surname: '',
    dni: '',
    grade: {id: 0, name: ''},
    section: {id: 0, name: ''},
    educationLevel: {id: 0, name: '', maxGrade: 0, maxSection: 0},
    state: ''
  }

  userRegisterAssistance: IUser = {
    id: '11111111',
    name: 'AUXILIAR',
    surname: 'AUXILIAR',
    password: 'AUXILIAR',
    rol: 'AUXILIAR'
  }

  assistanceQr: IAssistance = {
    student: this.studentQr,
    user: this.userRegisterAssistance,
  }

  loadStudentById(id: string):void{
      this._studentService.getStudentById(id).subscribe({
        next: (data: IStudentBackend) => {
          this.assistanceQr.student = data;
          this.registerAssistance(this.assistanceQr)
        },
        error:(err) => {
          console.log(err);
        },
      })
  }

  registerAssistance(assistance: IAssistance){
    this._assistanceService.registerAssistance(assistance).subscribe({
      next: (data: IAssistance) => {
        this._sweetAlert.successAssistance(data)
        this.onCamera()
        setTimeout(() => {
          this.onCamera()
        }, 1000);
      },
      error:(err) => {
        console.log(err);
      }
    })
  }


  availableDevices!: MediaDeviceInfo[];
  currentDevice!: MediaDeviceInfo;

  formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.EAN_13,
    BarcodeFormat.QR_CODE,
  ];

  hasDevices!: boolean;
  hasPermission!: boolean;

  qrResultString!: string;

  torchEnabled = false;
  torchAvailable$ = new BehaviorSubject<boolean>(false);
  tryHarder = false;


  clearResult(): void {
    this.qrResultString = '';
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
    this.cameraShow = !this.cameraShow

  }

  onCodeResult(resultString: string) {
    this.qrResultString = resultString
    this.loadStudentById(this.qrResultString)
  }

  onDeviceSelectChange(e: any) {
    const selected = e.target.value;
    const device = this.availableDevices.find(x => x.deviceId === selected);
    if (device !== null && device !== undefined) {
      this.currentDevice = device;
    }
  }



  onHasPermission(has: boolean) {
    this.hasPermission = has;
  }

  onTorchCompatible(isCompatible: boolean): void {
    this.torchAvailable$.next(isCompatible || false);
  }

  toggleTorch(): void {
    this.torchEnabled = !this.torchEnabled;
  }

  toggleTryHarder(): void {
    this.tryHarder = !this.tryHarder;
  }

  onCamera(){
    this.scannerEnabled = !this.scannerEnabled
    if(this.scannerEnabled){
      this.cameraShow = false
    }
  }
}
