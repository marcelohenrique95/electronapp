import { Observable } from 'rxjs';
import { ProductModel } from './../model/product.model';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpclient: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  public getProduct(): Observable<ProductModel>{
    return this.httpclient.get<ProductModel>('http://localhost:8080/product/listAllProduct');
  }

  public postProduct(productModel: ProductModel): Observable<ProductModel>{
    return this.httpclient.post<ProductModel>('http://localhost:8080/product' , JSON.stringify(productModel), this.httpOptions);
  }



}

