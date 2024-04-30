import { Component, ElementRef, ViewChild } from '@angular/core'
import * as ExcelJS from 'exceljs'
import { saveAs } from 'file-saver';
import { IStudent } from '../../../../core/model/student.model'
import { StudentService } from '../../../../core/service/student.service'
import { ModalComponent } from '../../modal/modal.component';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [ModalComponent],
  templateUrl: './student-excel.component.html',
  styleUrl: './student-excel.component.css'
})
export class FileUploadComponent {
  isLoadingTable: boolean = false
  constructor(private _studentService: StudentService){}

  studentList: IStudent[] = []
  isValidFile = false
  isValidData = true
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>
  @ViewChild(ModalComponent, { static: false }) modalComponent: ModalComponent | null = null;

  onFileChange(event: any): void {
    const file = event.target.files[0]
    const allowedTypes = ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel"]

    if (file && allowedTypes.includes(file.type)) {
      this.isValidFile = false
      const fileReader = new FileReader()

      fileReader.onload = (e: any) => {
        const arrayBuffer = e.target.result
        this.parseExcel(arrayBuffer)
      }

      fileReader.readAsArrayBuffer(file)
    } else {
        event.target.value = null
        this.isValidFile = true
    }

  }

  removeFileFromInput(){
    this.fileInput.nativeElement.value = ""
    this.studentList = []
    this.isValidData = true
  }

  parseExcel(arrayBuffer: any): void {
    const workbook = new ExcelJS.Workbook()
    workbook.xlsx.load(arrayBuffer).then((workbook) => {
      let jsonData: any[] = []

      workbook.eachSheet((worksheet, sheetId) => {
        const firstRow = worksheet.getRow(1)
        const headers = firstRow.values as string[]

        const headerMapping: { [key: string]: string } = {
          'NOMBRES': 'name',
          'APELLIDOS': 'surname',
          'DNI': 'id',
          'GRADO': 'grade',
          'SECCION': 'section'
        }

        worksheet.eachRow({ includeEmpty: false }, (row, rowIndex) => {
          if (rowIndex !== 1) {
            let rowData: any = {}
            row.eachCell({ includeEmpty: true }, (cell, colIndex) => {
              const header = headers[colIndex]
              const mappedHeader = headerMapping[header]
              if (mappedHeader) {
                rowData[mappedHeader] = cell.value?.toString().trim()
              }
            })
            jsonData.push(rowData)
          }
        })
      })
      this.studentList = jsonData
    })
  }

  sendStudentBatch(){
    this.isLoadingTable = true
    this._studentService.saveStudentBatch(this.studentList)
    .subscribe({
      next: (data: IStudent[]) => {
        this.isLoadingTable = false
        this.openModal()
        this.removeFileFromInput()
      },
      error:(err) => {
        this.isLoadingTable = false
        this.isValidData = false
      }
    })
  }

  downloadExcelFile() {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Estudiantes');
    worksheet.addRow(['NOMBRES', 'APELLIDOS', 'DNI', 'GRADO', 'SECCION']);
    workbook.xlsx.writeBuffer().then(buffer => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, 'estudiantes.xlsx');
    });
  }

  openModal(): void {
    if (this.modalComponent) {
      this.modalComponent.openModal();
    }
  }

}
