import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../core/services/orders/orders.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  private readonly formBuilder=inject(FormBuilder)
  private readonly activatedRoute=inject(ActivatedRoute)
  private readonly ordersService=inject( OrdersService)
  isloading:boolean=false;
  cartid:string='';

  checkoutforms !:FormGroup ;

  ngOnInit(): void {
      this.checkoutforms=this.formBuilder.group({
        details:[null,[Validators.required]],
        phone:[null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]],
        city:[null,[Validators.required]]
      })
      this.getcartid()
  }
  getcartid():void{
    this.activatedRoute.paramMap.subscribe({
      next:(param)=>{
        console.log(param)
        this.cartid=param.get('id')!

      }
    })
  }
  submitform():void{
    console.log(this.checkoutforms.value)
    this.ordersService.checkoutpayment(this.cartid , this.checkoutforms.value).subscribe({
      next:(res)=>{
        console.log(res)
        if(res.status==='success'){
          window.location.href=res.session.url
          // open(res.session.url,'_self')
        }
      }
    })
  }
}
