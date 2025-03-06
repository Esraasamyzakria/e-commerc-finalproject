import { Component, inject } from '@angular/core';
import{AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { AuthService } from '../../core/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private readonly authService=inject(AuthService)
  private readonly router=inject(Router)
  isloading:boolean=false;
  messerror:string='';
  isSuccess:string=''
  registerforms:FormGroup = new FormGroup({
    name:new FormControl(null , [Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    email:new FormControl(null,[Validators.required, Validators.email]),
    password:new FormControl(null ,[Validators.required,Validators.pattern(/^[A-Z]\w{7,}$/)]),
    rePassword:new FormControl(null,[Validators.required]),
    phone:new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
  },{ validators:this.confirempassword})
  submitform():void{
    if( this.registerforms.valid){
      this.isloading=true;
      this.authService.sendregesterform(this.registerforms.value).subscribe({
        next:(res)=>{
          console.log(res)
          if(res.message ==="success"){
            setTimeout(() => {
              this.router.navigate(['/login'])
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
    }else{
      this.registerforms.markAllAsTouched();
    }
  };
  confirempassword(group:AbstractControl){
    const password=group.get('password')?.value;
    const repassword=group.get('rePassword')?.value
    return password  ===repassword ? null : {'mismatch': true};
  }

}
