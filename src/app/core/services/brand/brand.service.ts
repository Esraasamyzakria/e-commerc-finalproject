import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api_url } from '../../custom-injection/api_url';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor( private httpClient:HttpClient , @Inject(api_url) private apipath:string) { }
  getallbrand():Observable<any>{
   return this.httpClient.get( this.apipath+"/brands")
  }
  getspecificbrand(id:string):Observable<any>{
    return this.httpClient.get( this.apipath+`/brands/${id}`)
   }
}
