import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { ICart } from '../../shared/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService)
  cartdata:ICart={} as ICart;
  ngOnInit(): void {
    this.getcartdata()
  };
  getcartdata():void{
    this.cartService.getLoggedusercart().subscribe({
      next:(res)=>{
        console.log(res.data)
        this.cartdata=res.data;
        this.cartService.cartnumber.next(res.numOfCartItems)
      },
      error:(err)=>{
        console.log(err)
      },
    })
  }
  removeitem(id:string):void{
    this.cartService.removeSpescificcart(id).subscribe({
      next:(res)=>{
      console.log(res)
      this.cartdata=res.data
      this.cartService.cartnumber.next(res.numOfCartItems)
      }
    })

  }
  updatacount(id:string,count:number):void{
    this.cartService.updatecartservice(id,count).subscribe({
      next:(res)=>{
          console.log(res)
          this.cartdata=res.data;

          this.cartService.cartnumber.next(res.numOfCartItems)
      }
    })
  }
clearallproduct():void{
  this.cartService.clearcart().subscribe({
    next:(res)=>{
      console.log(res)
      this.cartdata={} as ICart;
      this.cartService.cartnumber.next(0)
      }
  })
}

}
