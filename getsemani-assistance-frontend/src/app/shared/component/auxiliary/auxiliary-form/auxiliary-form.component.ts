import { Component, inject } from '@angular/core';
import { IUser } from '../../../../core/model/user.model';
import { UserService } from '../../../../core/service/user.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RolService } from '../../../../core/service/rol.service';

@Component({
  selector: 'app-auxiliary-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './auxiliary-form.component.html',
  styleUrl: './auxiliary-form.component.css'
})
export class AuxiliaryFormComponent {

  constructor(private _formBuilder: FormBuilder, private _userService: UserService) {}
  private rolService=inject(RolService);
  roles:any []=[]
  
  ngOnInit(): void {
    this.rolService.getAllRol().subscribe((roles:any) => 
    this.roles=roles);
  }

  newUser: IUser = {
    id: '',
    name: '',
    surname: '',
    password: '',
    rol: { id: 0 }
  }
   formGroup = this._formBuilder.nonNullable.group({
    id: ['', Validators.required],
    name: ['', Validators.required],
    surname: ['', Validators.required],
    id_rol: ['', Validators.required]
  })
  
  clickAdd(): void {
    if (this.formGroup.valid) {
      const formData = this.formGroup.value;
  
      // Verificar que los valores del formulario no sean undefined
      if (formData.id !== undefined && formData.name !== undefined && formData.surname !== undefined && formData.id_rol !== undefined) {
        // Asignar valores a newUser
        this.newUser.id = formData.id;
        this.newUser.name = formData.name;
        this.newUser.surname = formData.surname;
        this.newUser.password = formData.id; // Usar el mismo valor de id para password
        this.newUser.rol = { id: parseInt(formData.id_rol)  };
  
        // Llamar al método createUser del servicio de usuario para crear el nuevo usuario
        this._userService.createUser(this.newUser)
          .subscribe({
            next: (data: IUser) => {
              this.formGroup.reset()
              console.log('Datos enviados correctamente', data);
            },
            error: (err) => {
              console.error(err);
              this.formIsValid();
            }
          });
  
        // Imprimir los datos a enviar (opcional)
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
    apellido: 'surnameValid',
    id: 'idValid',
    id_rol: 'rolValid'
  };

  nameValid = false;
  surnameValid = false;
  idValid = false;
  rolValid = false;

  formIsValid() {
    Object.keys(this.formGroup.controls).forEach(field => {
      const control = this.formGroup.get(field);
      if (control) {
        const validationProperty = this.fieldValidations[field];
        (this as any)[validationProperty] = control.invalid;
      }
    });
  }
}
