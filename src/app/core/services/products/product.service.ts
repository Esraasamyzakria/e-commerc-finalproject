import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api_url } from '../../custom-injection/api_url';



@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient:HttpClient , @Inject(api_url) private apipath:string) { }
  getallproducts():Observable<any>{

    return  this.httpClient.get( this.apipath+'/products')
  }
  getspecificproducts(id:string):Observable<any>{

    return  this.httpClient.get( this.apipath+`/products/${id}`)
  }
}
