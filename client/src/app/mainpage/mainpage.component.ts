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
  productAddedMessage:string='';
  loading:boolean = false;

    ngOnInit(): void {
    this.loading = false;
  this.productService.getAllProducts().subscribe({
  next:(data)=>{
    this.products = data;
    this.loading = false;
  },
  error:(error)=>{
    console.error('Failed to load products: ',error);
    this.loading = false;
  }
})
}



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
