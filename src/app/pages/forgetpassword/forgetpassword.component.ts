import { Component, inject } from '@angular/core';
import {  FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  imports: [ReactiveFormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss'
})
export class ForgetpasswordComponent {
  private readonly authService =inject(AuthService)
  private readonly router =inject(Router)
  step:number=1;
  verifyemail:FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email])

  });
  verifycode:FormGroup=new FormGroup({
    resetCode:new FormControl(null,[Validators.required,Validators.pattern(/^\w{6}$/)])

  });
  resetpassword:FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    newPassword:new FormControl(null ,[Validators.required,Validators.pattern(/^[A-Z]\w{7,}$/)]),


  });
  verifyemailform():void{
     let emailvalue = this.verifyemail.get('email')?.value;
     this.resetpassword.get('email')?.patchValue(emailvalue)
    this.authService.setEmailVerify(this.verifyemail.value).subscribe({
      next:(res)=>{
        if(res.statusMsg=='success'){
          this.step=2;
        }
      }
    })

}
verifycodeform():void{
  this.authService.setCodeVerify(this.verifycode.value).subscribe({
    next:(res)=>{
      if(res.status=='Success'){
        this.step=3;
      }
    }
  })

}
verifypasseordform():void{
  this.authService.setpasswordVerify(this.resetpassword.value).subscribe({
    next:(res)=>{

        localStorage.setItem("token",res.token)
        this.authService.getuserdata()
        this.router.navigate(['/home'])

    }
  })

}
}
