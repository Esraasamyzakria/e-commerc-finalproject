import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { api_url } from '../../custom-injection/api_url';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private httpClient:HttpClient , @Inject(api_url) private apipath:string) { }
wishnumber:BehaviorSubject<number>=new BehaviorSubject(0);

  addproducttowishlist(id:string):Observable<any>{
    return this.httpClient.post(this.apipath+`/wishlist`,
      {
        productId:id

      })
  };
  getproducttowishlist():Observable<any>{
    return this.httpClient.get(this.apipath+`/wishlist`)
  }
  removeproducttowishlist(id:string):Observable<any>{
    return this.httpClient.delete(this.apipath+`/wishlist/${id}`)
  }
}
