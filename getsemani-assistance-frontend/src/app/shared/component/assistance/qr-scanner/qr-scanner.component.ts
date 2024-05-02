import { Component, ViewChild } from '@angular/core';
import { ZXingScannerComponent, ZXingScannerModule } from '@zxing/ngx-scanner';
import { BarcodeFormat} from '@zxing/library';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-qr-scanner',
  standalone: true,
  imports: [ZXingScannerModule],
  templateUrl: './qr-scanner.component.html',
  styleUrl: './qr-scanner.component.css'
})
export class QrScannerComponent {
  @ViewChild('scanner')
  scanner!: ZXingScannerComponent;


  title = 'getsemani-assistance';
  scannerEnabled = false


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
  }

  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
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

  encender(){
    this.scannerEnabled = true
  }
}
