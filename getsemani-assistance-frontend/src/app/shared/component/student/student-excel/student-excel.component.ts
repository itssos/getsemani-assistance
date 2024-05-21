import { IGrade } from './../../../../core/model/grade.model';
import { forkJoin, map } from 'rxjs';
import { Component, ElementRef, ViewChild } from '@angular/core'
import * as ExcelJS from 'exceljs'
import { saveAs } from 'file-saver';
import { IStudent } from '../../../../core/model/student.model'
import { StudentService } from '../../../../core/service/student.service'
import { IStudentBackend } from '../../../../core/model/student_backend.model';
import { GradeService } from '../../../../core/service/grade.service';
import { SectionService } from '../../../../core/service/section.service';
import { EducationLevelService } from '../../../../core/service/education_level.service';
import { SweetAlert } from '../../../../core/service/sweetAlert.service';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [],
  templateUrl: './student-excel.component.html',
  styleUrl: './student-excel.component.css'
})
export class FileUploadComponent {
  isLoadingTable: boolean = false
  constructor(
    private _studentService: StudentService,
    private _gradeService: GradeService,
    private _sectionService: SectionService,
    private _educationLevelService: EducationLevelService,
    private _sweetAlert: SweetAlert
  ) { }

  studentList: IStudent[] = []
  studentBatch: IStudentBackend[] = []
  isValidFile = false
  isValidData = true
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>

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

  removeFileFromInput() {
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
        const expectedHeaders = ['APELLIDOS', 'NOMBRES', 'DNI', 'GRADO', 'SECCION', 'NIVEL_EDUCACION']
        const headerMapping: { [key: string]: string } = {
          'APELLIDOS': 'surname',
          'NOMBRES': 'name',
          'DNI': 'dni',
          'GRADO': 'grade',
          'SECCION': 'section',
          'NIVEL_EDUCACION': 'education_level'
        }

        const headersMatch = expectedHeaders.every((header, index) =>header === headers[index+1])

        if (!headersMatch) {
          this.fileInput.nativeElement.value = ""
          this.studentList = []
          this._sweetAlert.fileNotStructureValid()
          return
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
    }).catch(error => {
      console.error('Error al leer el archivo Excel', error)
    })
  }

  sendStudentBatch() {
    this.isLoadingTable = true;
     const studentBatchPromises = this.studentList.map(student => {
      return forkJoin([
        this._gradeService.getByName(student.grade),
        this._sectionService.getByName(student.section),
        this._educationLevelService.getByName(student.education_level)
      ]).pipe(
        map(([gradeData, sectionData, educationLevelData]) => {
          if (gradeData && sectionData && educationLevelData) {
            return {
              id: student.id,
              name: student.name,
              surname: student.surname,
              dni: student.dni,
              grade: gradeData,
              section: sectionData,
              educationLevel: educationLevelData,
              state: 'ACTIVO'
            } as IStudentBackend;
          } else {
            console.error('Error fetching one of the required data', { student, gradeData, sectionData, educationLevelData });
            return undefined;
          }
        })
      ).toPromise();
    });

    Promise.all(studentBatchPromises).then(studentBatch => {
      this.studentBatch = studentBatch.filter(student => student !== undefined) as IStudentBackend[];

      if (this.studentBatch.length > 0) {
        this._studentService.saveStudentBatch(this.studentBatch)
          .subscribe({
            next: (data: IStudentBackend[]) => {
              this.isLoadingTable = false;
              this._sweetAlert.showAlert()
              this.removeFileFromInput();
            },
            error: (err) => {
              this.isLoadingTable = false;
              this.isValidData = false;
              console.error('Error saving student batch', err);
            }
          });
      } else {
        this.isLoadingTable = false;
        console.error('No valid students to save');
      }
    }).catch(error => {
      this.isLoadingTable = false;
      this.isValidData = false;
      console.error('Error preparing student batch', error);
    });
  }

  downloadExcelFile() {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Estudiantes');
    worksheet.addRow(['APELLIDOS', 'NOMBRES', 'DNI', 'GRADO', 'SECCION', 'NIVEL_EDUCACION']);
    workbook.xlsx.writeBuffer().then(buffer => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, 'estudiantes.xlsx');
    });
  }

}
