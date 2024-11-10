import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { CartService } from '../services/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
product:Product | undefined;
addedToCartMessage:string='';
quantity:number=1;
productId:number | undefined;

constructor(private cartService:CartService,private route:ActivatedRoute,private router:Router,private productService:ProductService){}

ngOnInit() {
  const id =this.route.snapshot.paramMap.get('id');
  if(id){
    this.productId=+id;
    this.productService.getProductId(this.productId).subscribe({
      next:(data)=>{
        this.product = data;
      },
      error:(error)=>{
        console.error('Failed to load product: ',error);
      }
    });
  }
}

isQuantityValid():boolean{
  return this.product?this.quantity<=this.product.stock:false;
}

getTotalPrice():number{
  return this.product? this.product.discountedPrice * this.quantity:0;
}

// Method to add product to cart
addToCart() {
  if(this.product){
    this.cartService.addToCart(this.product!, this.quantity);
    this.addedToCartMessage = `${this.product.name} has been added to your cart!`;
      setTimeout(() => {
        this.router.navigate(['/shopping-cart']);
      }, 3000); 
    }else{
    this.addedToCartMessage = 'Error:Product not found!';
    }
  }

// Quantity adjustment logic
increaseQuantity() {
  this.quantity++;
}

decreaseQuantity() {
  if (this.quantity > 1) {
    this.quantity--;
  }
}
}
