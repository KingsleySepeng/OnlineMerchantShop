import { Component, OnInit } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import { AuthService } from '../auth.service';
import {CommonModule} from '@angular/common';
import { Product } from '../models/product.model';
import { CartService } from '../cart.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-mainpage',
  standalone: true,
  imports: [
    RouterLink,CommonModule
  ],
  templateUrl: './mainpage.component.html',
  styleUrl: './mainpage.component.css'
})
export class MainpageComponent implements OnInit{

  constructor(private router: Router, public authService:AuthService,private cartService:CartService,private productService:ProductService) { }
  products:Product[]=[];

    ngOnInit(): void {
  this.products = this.productService.getAllProducts();  }
  productAddedMessage:string='';

  // products: Product[] = [
  //   new Product(1, 'Product 1','Description 1', 'https://via.placeholder.com/300x200', 10, 12.00, 10.00, true, true),
  //   new Product(2, 'Product 2','Description 1', 'https://via.placeholder.com/300x200', 5, 15.00, 13.00, false, true),
  //   new Product(3, 'Product 3','Description 1', 'https://via.placeholder.com/300x200', 8, 18.00, 16.00, true, false),
  // ];


 addToCart(product:Product){
  //logic to add product to cart if logged in
  this.cartService.addToCart(product);
  // this.router.navigate(['/shopping-cart']);
this.productAddedMessage = `${product.name} has been added to your cart!`;
setTimeout(()=>{
  this.productAddedMessage ='';
},3000);
 }


 goToLogin(){
  this.router.navigate(['/login'])
 }
}
