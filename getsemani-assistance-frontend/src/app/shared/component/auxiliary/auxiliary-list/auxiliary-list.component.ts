import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../../../core/service/user.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUser } from '../../../../core/model/user.model';
import { SweetAlert } from '../../../../core/service/sweetAlert.service';
import { dataShared } from '../../../../core/service/dataShared.service';

@Component({
  selector: 'app-auxiliary-list',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './auxiliary-list.component.html',
  styleUrl: './auxiliary-list.component.css'
})

export class AuxiliaryListComponent implements OnInit {
  constructor(private _formBuilder: FormBuilder,private _userService:UserService,private _dataService:dataShared
    ,private _sweetAlert:SweetAlert){}

  userss:any []=[]
  roles:any []=[]
  selectedId: string | null = null;

  formGroup = this._formBuilder.nonNullable.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
  })
  newUser: IUser = {
    id: '',
    name: '',
    surname: '',
    password: '',
    rol: ''
  }

  ngOnInit(): void {
    this._userService.getAllUser().subscribe((users: any[]) => {
      this.userss = users.filter(user => user.rol === 'AUXILIAR');
      console.log(this.userss);

    });


  }
  deleteUser(confirmacion: boolean) {
    if (confirmacion && this.selectedId !== null) {
      this._userService.deleteUser(this.selectedId).subscribe(() => {
        this.ngOnInit();
        this._sweetAlert.alertDeleted();
      }, error => {
        console.error('Error al eliminar usuario:', error);
      });
      this.selectedId = null;
    }
  }
  us: any = {};
  obtener(id: string){
    this._userService.getIdUser(id).subscribe((user: any) => {
      console.log('Datos del usuario obtenidos:', user);
      this.us=user;
      this.formGroup.patchValue({
        name: user.name,
        surname: user.surname,
      });
    }, error => {
      console.error('Error al obtener el usuario:', error);
    });
  }

  update() {
    if (this.us.id !== null && this.formGroup.valid) {
      const formData = this.formGroup.value;

      this.newUser.surname = formData.surname || '';
      this.newUser.name=formData.name || '';
      this.newUser.id=this.us.id;
      this.newUser.password=this.us.password;
      this.newUser.rol=this.us.rol;

      console.log(this.newUser);
      this._userService.updateUser(this.newUser).subscribe(() => {
        console.log('Usuario actualizado correctamente');
        this.ngOnInit();
        const closeButton = document.getElementById('closeButton');
        closeButton?.click();
        this.formGroup.reset();
        this._sweetAlert.alertUpdate();
      }, error => {
        console.error('Error al actualizar usuario:', error);
      });
    } else {
      this.formIsValid();
    }
  }


  setSelectedId(id: string) {
    this.selectedId = id;
  }
  fieldValidations: { [key: string]: string } = {
    name: 'nameValid',
    surname: 'surnameValid',
  };

  nameValid = false;
  surnameValid = false;

  formIsValid() {
    Object.keys(this.formGroup.controls).forEach(field => {
      const control = this.formGroup.get(field);
      if (control) {
        const validationProperty = this.fieldValidations[field];
        (this as any)[validationProperty] = control.invalid;
      }
    });
  }
  resetValidations() {
    this.nameValid = false;
    this.surnameValid = false;
  }
  pasarUser(user:any){
    this._dataService.enviarObjeto(user);
  }
}
