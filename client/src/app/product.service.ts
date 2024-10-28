import { Injectable } from '@angular/core';
import { Product } from './models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: Product[] = [
    new Product(1, 'Product 1','Description 1', 'https://via.placeholder.com/300x200', 10, 12.00, 10.00, true, true),
    new Product(2, 'Product 2','Description 1', 'https://via.placeholder.com/300x200', 5, 15.00, 13.00, false, true),
    new Product(3, 'Product 3','Description 1', 'https://via.placeholder.com/300x200', 8, 18.00, 16.00, true, false),
  ];
  
  getProductId(id: number) {
    return this.products.find(product=>product.id===id);
  }

  getAllProducts(){
    return this.products;
  }
  constructor() { }
}
