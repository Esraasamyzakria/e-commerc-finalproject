import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/services/products/product.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';

@Component({
  selector: 'app-details',
  imports: [ CurrencyPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  private readonly activatedRoute=inject(ActivatedRoute);
  private readonly productService=inject(ProductService);
  private readonly cartService=inject(CartService);
  private readonly toastrService=inject(ToastrService)
  private readonly wishlistService=inject(WishlistService)
  productdetails:Iproduct={}as Iproduct;
  productid:any;
  wishlist:string[]=[];
  ngOnInit(): void {
this.activatedRoute.paramMap.subscribe({
  next:(res)=>{
    this.productid=res.get("id");
    console.log(this.productid)
    this.productService.getspecificproducts(this.productid).subscribe({
      next:(res)=>{
console.log(res)
this.productdetails=res.data
      },
    })

  },
  error:(err)=>{

  },
})
this.wishlistService.getproducttowishlist().subscribe({
  next:(res)=>{
    console.log(res.data)
    const newdata=res.data.map((item:any)=> item.id )
    this.wishlist=newdata
  },
})
  }
addtocart(id:string):void{
  this.cartService.addProductTocart(id).subscribe({
    next:(res)=>{
  console.log(res)
  this.toastrService.success(res.message,'Success')
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
