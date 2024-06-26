import { Component, inject } from '@angular/core';
import { IUser } from '../../../../core/model/user.model';
import { UserService } from '../../../../core/service/user.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SweetAlert } from '../../../../core/service/sweetAlert.service';
import { Observable, map } from 'rxjs';
import { Router } from '@angular/router';
import { dataShared } from '../../../../core/service/dataShared.service';

@Component({
  selector: 'app-auxiliary-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './auxiliary-form.component.html',
  styleUrl: './auxiliary-form.component.css'
})
export class AuxiliaryFormComponent {

constructor(private _formBuilder: FormBuilder, private _userService: UserService,private router:Router,
  private _sweetAlert:SweetAlert,private _sharedState:dataShared) {}

roles:any []=[]


  formGroup = this._formBuilder.nonNullable.group({
    id: ['', [
      Validators.required,
      Validators.pattern('^[0-9]+$'),
      Validators.minLength(8),
      Validators.maxLength(8)
    ], [
      this.validateDni.bind(this) 
    ]],
    name: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
    surname: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
})


get id(){
  return this.formGroup.controls.id;
}
get name(){
  return this.formGroup.controls.name;
}
get surname(){
  return this.formGroup.controls.surname;
}

clickAdd(): void {
  const formData = this.formGroup.value;

    const user: IUser = {
      id: formData.id!,
      name: formData.name!,
      surname: formData.surname!,
      rol: 'AUXILIAR'
    };

  if (this.formGroup.valid) {

      this._userService.createUser(user).subscribe({
          next: (data: IUser) => {
            console.log('Datos enviados correctamente', data);
          },
          error: (err) => {
            console.error(err);
            // this.formIsValid();
          },complete:()=>{
            this.formGroup.reset();
            this._sweetAlert.showAlert();
            // this.resetValidations();

            //falta recarga la lista porque no se muestra
            this._sharedState.triggerReloadList(); 
          }
        });
      console.log('Datos a enviar:', user);
  } else {
    this.formGroup.markAllAsTouched();
    console.warn('¡El formulario no es válido!');
    // this.formIsValid();
  }
}
validateDni(control:any) {
  const id = control.value;
  return this._userService.checkDniExists(id).pipe(
    map(isExists => {
      return isExists ? { dniExists: true } : null;
    })
  );
}
}
