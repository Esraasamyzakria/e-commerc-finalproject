import { Component, inject } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ActivatedRoute } from '@angular/router';
import { Icategoy } from '../../shared/interfaces/icategoy';

@Component({
  selector: 'app-gategoriesdetailes',
  imports: [],
  templateUrl: './gategoriesdetailes.component.html',
  styleUrl: './gategoriesdetailes.component.scss'
})
export class GategoriesdetailesComponent {
    private readonly activatedRoute=inject(ActivatedRoute);
    private readonly categoriesService=inject(CategoriesService);
    categoreydetails:Icategoy={}as Icategoy;
    categoreyid:any;
    ngOnInit(): void {
  this.activatedRoute.paramMap.subscribe({
    next:(res)=>{
      this.categoreyid=res.get("id");
      console.log(this.categoreyid)
      this.categoriesService.getspecificcategory(this.categoreyid).subscribe({
        next:(res)=>{
  console.log(res)
  this.categoreydetails=res.data
        },
      })

    },
    error:(err)=>{

    },
  })
    }

}
