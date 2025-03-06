import { Component, inject, input, OnInit, PLATFORM_ID } from '@angular/core';
import { FlowbiteService } from '../../core/services/flowbite/flowbite.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { CartService } from '../../core/services/cart/cart.service';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [ RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  constructor(private flowbiteService: FlowbiteService ,private authService:AuthService ,private cartService:CartService,private wishlistService:WishlistService ){}
  private pLATFORM_ID=inject(PLATFORM_ID)
  countnumber!:number
  ngOnInit(): void {
    this.flowbiteService.loadFlowbite(flowbite => {
      // Your custom code here
      console.log('Flowbite loaded', flowbite);
    });
    if(isPlatformBrowser(this.pLATFORM_ID)){
      if(localStorage.getItem('token')!==null){
         this.cartService.cartnumber.subscribe({
          next:(value)=>{
            this.countnumber=value
          }
         })
         this.cartService.getLoggedusercart().subscribe({
          next:(res)=>{
            this.cartService.cartnumber.next(res.numOfCartItems)
          }
         })
      }
    }
  }

  islogin=input<boolean>(true)
  logout():void{
this.authService.logout()
  }

}
