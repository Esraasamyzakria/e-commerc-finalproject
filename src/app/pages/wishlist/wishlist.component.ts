import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { SearchPipe } from '../../shared/pipes/search/search.pipe';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  imports: [CurrencyPipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent  implements OnInit{
  private readonly wishlistService = inject(WishlistService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  products:Iproduct[]=[] ;
  wishlist:string[]=[];
ngOnInit(): void {
    this.wishlistService.getproducttowishlist().subscribe({
      next:(res)=>{
        console.log(res)
        this.products=res.data
        const newdata=res.data.map((item:any)=> item.id )
        this.wishlist=newdata
      }
    })
}
addtocart(id:string):void{
  this.cartService.addProductTocart(id).subscribe({
   next:(res)=>{
 console.log(res)


 this.toastrService.success(res.message,'Success')
 this.cartService.cartnumber.next(res.numOfCartItems)
   },
   error:(err)=>{
     console.log(err)
       },
  })
 }
 removewishlist(id:string){
  this.wishlistService.removeproducttowishlist(id).subscribe({
    next:(res)=>{
      console.log(res)
      this.toastrService.success(res.message,'Success')
      this.wishlist=res.data;
      const newdata=this.products.filter((item:any)=> this.wishlist.includes(item._id));
      this.products=newdata;
    }
  })
}
}
