import { Component, OnInit } from '@angular/core';
import { dataShared } from '../../../../core/service/dataShared.service';
import { UserService } from '../../../../core/service/user.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUser } from '../../../../core/model/user.model';
import { SweetAlert } from '../../../../core/service/sweetAlert.service';

@Component({
  selector: 'app-auxiliary-info',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './auxiliary-info.component.html',
  styleUrl: './auxiliary-info.component.css'
})
export class AuxiliaryInfoComponent  implements OnInit{
  user: any;
  state:any;
  isButtonDisabled: boolean = false;
  constructor(private _dataService: dataShared,private _userService:UserService,private _formBuilder: FormBuilder,
    private _sweetAlert:SweetAlert
  ) { }

  ngOnInit() {
    this._dataService.objetoActual.subscribe((data: { user: any, state: boolean } | null) => {
      this.user=data?.user;
      if (data?.state) {
        this.isButtonDisabled = false;
      } else {
        this.isButtonDisabled = true;
      }
    });
  }
  selectedId: string | null = null;
  newUser: IUser = {
    id: '',
    name: '',
    surname: '',
    password: '',
    rol: ''
  }
  formGroup = this._formBuilder.nonNullable.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    password: ['', Validators.required],
  })
  fieldValidations: { [key: string]: string } = {
    name: 'nameValid',
    surname: 'surnameValid',
    password:'passValid',
  };

  nameValid = false;
  surnameValid = false;
  passValid=false;
  setSelectedId(id: string) {
    this.selectedId = id;
  }
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
    this.passValid=false;
  }
  us: any = {};
  obtener(id: string){
    this._userService.getIdUser(id).subscribe((user: any) => {
      console.log('Datos del usuario obtenidos:', user);
      this.us=user;
      this.formGroup.patchValue({
        name: user.name,
        surname: user.surname,
        password:this.us.password
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
      this.newUser.password=formData.password || '';
      this.newUser.rol=this.us.rol;

      console.log(this.newUser);
      this._userService.updateUser(this.newUser).subscribe(() => {
        console.log('Usuario actualizado correctamente');
        this.ngOnInit();
        const closeButton = document.getElementById('closeButton');
        closeButton?.click();
        this.formGroup.reset();
        window.location.reload();
        this._sweetAlert.alertUpdate();
      }, error => {
        console.error('Error al actualizar usuario:', error);
      });
    } else {
      this.formIsValid();
    }
  }
  deleteUser(confirmacion: boolean) {
    if (confirmacion && this.selectedId !== null) {
      this._userService.deleteUser(this.selectedId).subscribe(() => {
        this._sweetAlert.alertDeleted();
        window.location.reload();
      }, error => {
        console.error('Error al eliminar usuario:', error);
      });
      this.selectedId = null;
    }
  }
}
