import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  private  apiUrl = 'http://localhost:8080/api/products';
  constructor(private http:HttpClient) { }

  getProductId(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  getAllProducts():Observable<Product[]>{
  return this.http.get<Product[]>(this.apiUrl);
  }

  createProduct(product:Product):Observable<Product>{
    return this.http.post<Product>(this.apiUrl,product);
  }

  updateProduct(id:number,product:Product):Observable<Product>{
    return this.http.put<Product>(`${this.apiUrl}/${id}`,product);
  }

  deleteProduct(id:number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
