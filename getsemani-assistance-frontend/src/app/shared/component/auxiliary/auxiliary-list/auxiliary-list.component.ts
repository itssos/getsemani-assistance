import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../../../core/service/user.service';
import { RolService } from '../../../../core/service/rol.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUser } from '../../../../core/model/user.model';
@Component({
  selector: 'app-auxiliary-list',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './auxiliary-list.component.html',
  styleUrl: './auxiliary-list.component.css'
})
export class AuxiliaryListComponent implements OnInit {
  private userService=inject(UserService);
  private rolService=inject(RolService);

  constructor(private _formBuilder: FormBuilder){};

  users:any []=[]
  roles:any []=[]
  selectedId: string | null = null;

  formGroup = this._formBuilder.nonNullable.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    id_rol: ['', Validators.required]
  })
  newUser: IUser = {
    id: '',
    name: '',
    surname: '',
    password: '',
    rol: { id: 0 }
  }

  listRol():void{
    this.rolService.getAllRol().subscribe((roles:any) => 
      this.roles=roles);
  }
  ngOnInit(): void {
    this.userService.getAllUser().subscribe((users:any) => 
    this.users=users);
    this.listRol();
  }
  deleteUser(confirmacion: boolean) {
    if (confirmacion && this.selectedId !== null) {
      this.userService.deleteUser(this.selectedId).subscribe(() => {
        this.ngOnInit();
      }, error => {
        console.error('Error al eliminar usuario:', error);
      });
      this.selectedId = null;
    }
  }
  us: any = {};
  obtener(id: string){
    this.userService.getIdUser(id).subscribe((user: any) => {
      console.log('Datos del usuario obtenidos:', user);
      // Asignar los datos obtenidos al formulario
      this.us=user;
      this.formGroup.patchValue({
        name: user.name,
        surname: user.surname,
        id_rol: user.rol.id
      });
    }, error => {
      console.error('Error al obtener el usuario:', error);
    });
  }

  update() {
    
    if (this.us.id !== null && this.formGroup.valid) {
      const formData = this.formGroup.value;

      this.newUser.surname = formData.surname || ''; // Si es undefined, asignar una cadena vacía
      this.newUser.rol.id=parseInt(formData.id_rol !== undefined ? formData.id_rol : '') || 0;
      this.newUser.name=formData.name || '';
      this.newUser.id=this.us.id;
      this.newUser.password=this.us.password;
      console.log(this.newUser);
      this.userService.updateUser(this.us.id, this.newUser).subscribe(() => {
        console.log('Usuario actualizado correctamente');
        // Actualizar la lista de usuarios después de la actualización
        this.ngOnInit();
        // Limpiar el formulario después de la actualización
        this.formGroup.reset();
      }, error => {
        console.error('Error al actualizar usuario:', error);
      });
    } else {
      // Si el formulario no es válido, mostrar mensajes de validación
      this.formIsValid();
    }
  }
  

  setSelectedId(id: string) {
    this.selectedId = id;
  }
  fieldValidations: { [key: string]: string } = {
    name: 'nameValid',
    apellido: 'surnameValid',
    id_rol: 'rolValid'
  };

  nameValid = false;
  surnameValid = false;
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
