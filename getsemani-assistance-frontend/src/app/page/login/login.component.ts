import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../core/auth/login.service';
import { ILoginRequest } from '../../core/model/login_request.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  constructor( private formBuilder:FormBuilder,private router:Router,private loginService:LoginService){ };

  errorLogin:String="";

  loginForm=this.formBuilder.group({
    id: ['', [Validators.required,Validators.minLength(6),Validators.maxLength(8),Validators.pattern('^[0-9]+$')]],
    password:['',Validators.required]
  });

  ngOnInit(): void {
    
  }
  get id(){
    return this.loginForm.controls.id;
  }
  get password(){
    return this.loginForm.controls.password;
  }

  login(){
    if(this.loginForm.valid){
      this.errorLogin="";
      this.loginService.login(this.loginForm.value as ILoginRequest).subscribe({
        next:(userData)=>{
          console.log(userData);
        },
        error:(errorData)=>{
          console.error(errorData);
          this.errorLogin=errorData;
        },
        complete:()=>{
          this.loginForm.reset();
          this.router.navigate(['/']).then(() => {
            window.location.reload();
          });
        }
      });
    }else{
      this.loginForm.markAllAsTouched();
    }
  }

}
