import { Component, OnInit, ViewChild } from '@angular/core';
import { ZXingScannerComponent, ZXingScannerModule } from '@zxing/ngx-scanner';
import { BarcodeFormat} from '@zxing/library';
import { BehaviorSubject } from 'rxjs';
import { IStudentBackend } from '../../../../core/model/student_backend.model';
import { StudentService } from '../../../../core/service/student.service';
import { AssistanceService } from '../../../../core/service/assistance.service';
import { IAssistance } from '../../../../core/model/assistance.model';
import { IUser } from '../../../../core/model/user.model';
import { SweetAlert } from '../../../../core/service/sweetAlert.service';
import { LoginService } from '../../../../core/auth/login.service';
import { UserService } from '../../../../core/service/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-qr-scanner',
  standalone: true,
  imports: [ZXingScannerModule],
  templateUrl: './qr-scanner.component.html',
  styleUrl: './qr-scanner.component.css'
})
export class QrScannerComponent implements OnInit {

  constructor(
    private _loginService: LoginService,
    private _userService: UserService,
    private _jwtHelper: JwtHelperService,
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
    id: '',
    name: '',
    surname: '',
    password: '',
    rol: ''
  }

  assistanceQr: IAssistance = {
    student: this.studentQr,
    user: this.userRegisterAssistance,
    state: ''
  }

  ngOnInit(): void {
    this._loginService.currentUserData.subscribe((value: any) => {
      const token = value.toString();
      const decodedToken = this._jwtHelper.decodeToken(token);
      const userId: string = decodedToken.sub;

      if (userId) {
        this._userService.getIdUser(userId).subscribe(
          (user: IUser) => {
            this.userRegisterAssistance.id = user.id;
            this.userRegisterAssistance.name = user.name;
            this.userRegisterAssistance.surname = user.surname;
            this.userRegisterAssistance.rol = user.rol;
            this.assistanceQr.user = this.userRegisterAssistance

            console.log(this.assistanceQr)

          },
          (error) => {
            console.error('Error al obtener detalles del usuario', error);
          }
        );
      }
    });
  }



  loadStudentById(id: string): void {
    this._studentService.getStudentById(id).subscribe({
      next: (data: IStudentBackend | null) => {
        if (data) {
          this.assistanceQr.student = data;
          console.log(this.assistanceQr);
          this.registerAssistance(this.assistanceQr);
        } else {
          this._sweetAlert.notFoundStudentById();
        }
      },
      error: (error) => {
        console.error('Error inesperado al cargar el estudiante:', error.message);
      }
    });
  }


  registerAssistance(assistance: IAssistance){
    this._assistanceService.registerAssistance(assistance).subscribe({
      next: (data: IAssistance) => {
        if(data){
          this._sweetAlert.successAssistance(data)
          this.onCamera()
          setTimeout(() => {
            this.onCamera()
          }, 1000);
        }else{
          console.log("NO ES HORA");

        }
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


