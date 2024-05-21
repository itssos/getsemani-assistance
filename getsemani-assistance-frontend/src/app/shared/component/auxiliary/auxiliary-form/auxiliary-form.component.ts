import { Component, inject } from '@angular/core';
import { IUser } from '../../../../core/model/user.model';
import { UserService } from '../../../../core/service/user.service';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { SweetAlert } from '../../../../core/service/sweetAlert.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-auxiliary-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './auxiliary-form.component.html',
  styleUrl: './auxiliary-form.component.css'
})
export class AuxiliaryFormComponent {

constructor(private _formBuilder: FormBuilder, private _userService: UserService,
  private _sweetAlert:SweetAlert) {}

roles:any []=[]
  


newUser: IUser = {
  id: '',
  name: '',
  surname: '',
  password: '',
  rol: ''
}
  formGroup = this._formBuilder.nonNullable.group({
    id: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)],this.isUserIdExists()],
  name: ['', Validators.required],
  surname: ['', Validators.required],
})


clickAdd(): void {
  if (this.formGroup.valid) {
    const formData = this.formGroup.value;

    if (formData.id !== undefined && formData.name !== undefined && formData.surname !== undefined) {
      this.newUser.id = formData.id;
      this.newUser.name = formData.name;
      this.newUser.surname = formData.surname;
      this.newUser.password = formData.id;
      this.newUser.rol = 'Auxiliar';
      
      this._userService.createUser(this.newUser)
        .subscribe({
          next: (data: IUser) => {
            this.formGroup.reset()
            console.log('Datos enviados correctamente', data);
            this.resetValidations();
            this._sweetAlert.showAlert();
            window.location.reload();
          },
          error: (err) => {
            console.error(err);
            this.formIsValid();
          }
        });

      console.log('Datos a enviar:', this.newUser);
    } else {
      console.warn('¡Alguno de los campos del formulario es undefined!');
    }
  } else {
    console.warn('¡El formulario no es válido!');
    this.formIsValid();
  }
}


fieldValidations: { [key: string]: string } = {
  name: 'nameValid',
  surname: 'surnameValid',
  id: 'idValid',
};

nameValid = false;
surnameValid = false;
idValid = false;

formIsValid() {
  Object.keys(this.formGroup.controls).forEach(field => {
    const control = this.formGroup.get(field);
    if (control) {
      const validationProperty = this.fieldValidations[field];
      (this as any)[validationProperty] = control.invalid;
    }
  });
}
isUserIdExists(): Validators {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const userId = control.value;
    return this._userService.getAllUser().pipe(
      map(users => users.some(user => user.id === userId) ? { 'idExists': true } : null)
    );
  };
}
resetValidations() {
  this.nameValid = false;
  this.surnameValid = false;
  this.idValid = false;
}
}