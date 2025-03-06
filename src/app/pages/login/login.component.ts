import { Component, inject } from '@angular/core';
import{AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { AuthService } from '../../core/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly authService=inject(AuthService)
  private readonly router=inject(Router)
  isloading:boolean=false;
  messerror:string='';
  isSuccess:string=''
  loginform:FormGroup = new FormGroup({
    email:new FormControl(null,[Validators.required, Validators.email]),
    password:new FormControl(null ,[Validators.required,Validators.pattern(/^[A-Z]\w{7,}$/)]),
  })
submitform():void{
  if( this.loginform.valid){
    this.isloading=true;
    this.authService.sendloginform(this.loginform.value).subscribe({
      next:(res)=>{
        console.log(res)
        if(res.message ==="success"){
          setTimeout(() => {
            localStorage.setItem("token",res.token)
            this.authService.getuserdata()
            this.router.navigate(['/home'])
          }, 500);
          this.isSuccess=res.message
        }
        this.isloading=false;
      },
      error:(err:HttpErrorResponse)=>{
        console.log(err)
        this.messerror= err.error.message;
        this.isloading=false;
      }
    })
  }
  else{
    this.loginform.markAllAsTouched()
  }
};
}
