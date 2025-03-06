import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/products/product.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Icategoy } from '../../shared/interfaces/icategoy';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';

@Component({
  selector: 'app-home',
  imports: [CarouselModule,CurrencyPipe,FormsModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private readonly productService=inject(ProductService)
  private readonly categoriesService=inject(CategoriesService)
  private readonly cartService=inject(CartService)
   private readonly toastrService=inject(ToastrService)
   private readonly wishlistService=inject(WishlistService)
  products:Iproduct[]=[];
  categories:Icategoy[]=[];
  wishlist:string[]=[];
  custommainOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay:true,
    autoplayTimeout:2000,
    navSpeed: 700,
    navText: ['', ''],
     items: 1,
    nav: false
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay:true,
    autoplayTimeout:2000,
    autoplayHoverPause:true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 5
      }
    },
    nav: false
  }

  ngOnInit(): void {
    this.getproductdata()
    this.getallcategorey()
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
  getallcategorey():void{
    this.categoriesService.getallcategory().subscribe({
      next:(res)=>{
        console.log(res.data)
        this.categories=res.data
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
    }
  })
}
}
