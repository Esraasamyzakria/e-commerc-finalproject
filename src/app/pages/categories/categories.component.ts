import { Component, inject } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { CartService } from '../../core/services/cart/cart.service';
import { Icategoy } from '../../shared/interfaces/icategoy';
import { FlowbiteService } from '../../core/services/flowbite/flowbite.service';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-categories',
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  constructor(private flowbiteService: FlowbiteService) {}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite(flowbite => {
      // Your custom code here
      console.log('Flowbite loaded', flowbite);
    });
    this.getallcategorey();

  }
  categories:Icategoy[]=[];
  private readonly categoriesService=inject(CategoriesService)
  private readonly cartService=inject(CartService)
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



}

