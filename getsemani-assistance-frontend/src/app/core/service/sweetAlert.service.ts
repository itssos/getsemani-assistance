import { Injectable } from '@angular/core';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { IAssistance } from '../model/assistance.model';
@Injectable({
  providedIn: 'root'
})
export class SweetAlert {

  alertUpdate(){
    Swal.fire({
      icon: 'warning',
      title: '¡Actualizado!',
      text: 'El usuario ha sido actualizado exitosamente',
      toast: true,
      position: 'top-end',
      timer: 3000, // Duración en milisegundos
      showConfirmButton: false // No muestra el botón de confirmación
    });
  }
  alertDeleted(){
    Swal.fire({
      icon: 'error',
      title: 'Eliminado!',
      text: 'El usuario ha sido eliminado exitosamente',
      toast: true,
      position: 'top-end',
      timer: 3000, // Duración en milisegundos
      showConfirmButton: false // No muestra el botón de confirmación
    });
  }
  showAlert() {
    Swal.fire({
      icon: 'success',
      title: 'Operación exitosa',
      text: 'La operación se completó con éxito.'
    });
  }


  successAssistance(assistance: IAssistance) {
    Swal.fire({
      icon: 'success',
      title: '¡Asistencia registrada!',
      text: `${assistance.student.surname} ${assistance.student.name}`,
      timer: 1000,
      showConfirmButton: false
    });
  }
  notFoundStudentById(){
    Swal.fire({
      icon: 'error',
      title: '¡Error!',
      text: 'No existe ese Estudiante',
      toast: true,
      position: 'top-end',
      timer: 1500,
      showConfirmButton: false
    });
  }

  fileNotStructureValid(){
    Swal.fire({
      icon: 'error',
      title: '¡Invalido!',
      text: 'El archivo no contiene la estructura requerida.',
      toast: true,
      position: 'top-end',
      timer: 1500,
      showConfirmButton: false
    });
  }
}
