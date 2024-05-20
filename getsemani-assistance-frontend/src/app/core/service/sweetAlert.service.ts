import { Injectable } from '@angular/core';
import Swal, { SweetAlertOptions } from 'sweetalert2';
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
}
