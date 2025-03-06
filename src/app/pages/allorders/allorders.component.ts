import { Component, inject, OnInit } from '@angular/core';
import { OrdersService } from '../../core/services/orders/orders.service';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-allorders',
  imports: [],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent  {
  // private readonly ordersService= inject(OrdersService)
  // private readonly authService= inject(AuthService)
  // userid:string=''
  // ngOnInit(): void {
  //   this.authService.getuserdata()
  //   this.userid=this.authService.userdata.id
  //   this.ordersService.getuserorder(this.userid).subscribe({
  //     next:(res)=>{
  //        console.log(res)
  //     }
  //   });
  // }
}
