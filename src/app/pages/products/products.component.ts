import { Component, inject } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { ProductService } from '../../core/services/products/product.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../shared/pipes/search/search.pipe';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';

@Component({
  selector: 'app-products',
  imports: [CurrencyPipe,RouterLink,SearchPipe,FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
    private readonly productService=inject(ProductService)
    private readonly cartService=inject(CartService)
    private readonly toastrService=inject(ToastrService)
    private readonly wishlistService=inject(WishlistService)
    products:Iproduct[]=[];
    searchs:string=" ";
    wishlist:string[]=[];
    ngOnInit(): void {
      this.getproductdata()
      this.wishlistService.getproducttowishlist().subscribe({
        next:(res)=>{
          console.log(res.data)
          const newdata=res.data.map((item:any)=> item.id )
          this.wishlist=newdata
        },
      })
    }
    getproductdata():void{
      this.productService.getallproducts().subscribe({
        next:(res)=>{
          console.log(res.data)
          this.products=res.data
        },
        error:(err)=>{
          console.log(err)
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
  addwishlist(id:string){
    this.wishlistService.addproducttowishlist(id).subscribe({
      next:(res)=>{
        console.log(res)
        this.wishlist=res.data
        this.toastrService.success(res.message,'Success')
      }
    })

  }
  removewishlist(id:string){
    this.wishlistService.removeproducttowishlist(id).subscribe({
      next:(res)=>{
        console.log(res)
        this.wishlist=res.data
        this.toastrService.success(res.message,'Success')
        this.products=res.data
      }
    })
  }

}
