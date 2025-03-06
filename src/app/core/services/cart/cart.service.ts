import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { api_url } from '../../custom-injection/api_url';
import { Header } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartnumber:BehaviorSubject<number>=new BehaviorSubject(0);
  constructor( private httpClient:HttpClient , @Inject(api_url) private apipath:string) {
  }
  addProductTocart(Id:string):Observable<any>{
    return this.httpClient.post(this.apipath +`/cart`,
      {
        "productId":Id
    }
    )
  };
  getLoggedusercart():Observable<any>{
    return this.httpClient.get(this.apipath+`/cart`
    )
  };
  removeSpescificcart(id:string):Observable<any>{
    return this.httpClient.delete(this.apipath+`/cart/${id}`
    )

  };
  updatecartservice(id:string , newcount:number):Observable<any>{
    return this.httpClient.put(this.apipath+`/cart/${id}`,
      {
        "count": newcount
      }
    )
  };
  clearcart():Observable<any>{
    return this.httpClient.delete(this.apipath+`/cart`
    )
};
}
