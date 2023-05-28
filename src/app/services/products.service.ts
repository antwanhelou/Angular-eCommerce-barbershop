import { Injectable } from '@angular/core';
import { Product } from 'src/app/model/product';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products : Product[]=[]
  baseURL: string = 'http://localhost:3000';
  headers = {'content-type':'application/json'};
  constructor(private http: HttpClient) { }


  getPopular(): Observable<any>
  {
    return this.http.get(this.baseURL + '/popular');
  }
  getproducts(): Observable<any>{
    return this.http.get<any>("http://localhost:3000/products")
    .pipe(map((res:any)=>{
      return res;
    }))
  }
    


}
