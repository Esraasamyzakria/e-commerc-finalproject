// import { Component, inject } from '@angular/core';
// import { CartService } from '../../core/services/cart/cart.service';
// import { CategoriesService } from '../../core/services/categories/categories.service';
// import { FlowbiteService } from '../../core/services/flowbite/flowbite.service';
// import { Icategoy } from '../../shared/interfaces/icategoy';
// import { ActivatedRoute, RouterLink } from '@angular/router';
// import { BrandService } from '../../core/services/brand/brand.service';
// import { Ibrand } from '../../shared/interfaces/ibrand';
// import { NgIf } from '@angular/common';


// @Component({
//   selector: 'app-brands',
//   imports: [NgIf],
//   templateUrl: './brands.component.html',
//   styleUrl: './brands.component.scss'
// })
// export class BrandsComponent {
// brandid: any;
// brandsdetails:Ibrand={}as Ibrand;
// brands:Ibrand[]=[];
// isModalOpen: boolean = false;
//   constructor(private flowbiteService: FlowbiteService) {}
//   private readonly activatedRoute=inject(ActivatedRoute);
//   private readonly brandService=inject(BrandService);
// ngOnInit(): void {
//   this.flowbiteService.loadFlowbite(flowbite => {
//     // Your custom code here
//     console.log('Flowbite loaded', flowbite);
//   });
//   this.getallbrand();
//   this.activatedRoute.paramMap.subscribe({
//     next:(res)=>{
//       this.brandid=res.get("id");
//       console.log(this.brandid)
//       this.brandService.getspecificbrand(this.brandid).subscribe({
//   next:(res)=>{
//   console.log(res)
//   this.brandsdetails=res.data
//         },
//       })

//     },
//     error:(err)=>{

//     },
//   })

// }
// getallbrand():void{
//   this.brandService.getallbrand().subscribe({
//     next:(res)=>{
//       console.log(res.data)
//       this.brands=res.data
//     },
//     error:(err)=>{
//       console.log(err)
//     }
//   })
// }

// openModal(brand: Ibrand): void {
//   this.brandsdetails = brand;
//   this.isModalOpen = true;
// }

// // ✅ إغلاق المودال
// closeModal(): void {
//   this.isModalOpen = false;
// }

// }


import { Component, computed, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { BrandService } from '../../core/services/brand/brand.service';
import { Ibrand } from '../../shared/interfaces/ibrand';
import { FlowbiteService } from '../../core/services/flowbite/flowbite.service';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-brands',
  imports: [NgIf],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit{
  constructor(private flowbiteService: FlowbiteService) {}
  private readonly brandService=inject(BrandService)
  private readonly activatedRoute=inject(ActivatedRoute);
brandid: any;
brandsdetails:Ibrand={}as Ibrand;
 brands:Ibrand[]=[];
isModalOpen: boolean = false;
ngOnInit(): void {
  this.flowbiteService.loadFlowbite(flowbite => {
    console.log('Flowbite loaded', flowbite);
  });
  this.getallbrand();


  this.activatedRoute.paramMap.subscribe({
    next: (res) => {
      this.brandid=res.get("id");
      if (this.brandid) {
        this.brandService.getspecificbrand(this.brandid).subscribe({
          next: (res) => {
            console.log(res);
            this.brandsdetails=res.data
          },
          error: (err) => {
            console.error("Error fetching brand details:", err);
          }
        });
      }
    },
  });
}
getallbrand():void{
  this.brandService.getallbrand().subscribe({
    next:(res)=>{
      console.log(res.data)
      this.brands=res.data
    },
    error:(err)=>{
      console.log(err)
    }
  })
}
openModal(brand: Ibrand): void {
  this.brandsdetails = brand;
  this.isModalOpen = true;
}
closeModal(): void {
  this.isModalOpen=false;
}

}
