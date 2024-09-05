import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { CartService } from '../cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
product!:Product;
addedToCartMessage:string='';
quantity:number=1;

constructor(private cartService:CartService,private route:ActivatedRoute,private router:Router){}
ngOnInit() {
  const productId = this.route.snapshot.paramMap.get('id');
  // Fetch the product based on productId (you can implement this depending on your setup)
  // For simplicity, let's assume the product is fetched or passed to this component
  // this.product = getProductById(productId);
}

// Method to add product to cart
addToCart() {
  this.cartService.addToCart(this.product, this.quantity);
  this.addedToCartMessage = `${this.product.name} has been added to your cart!`;

  // Optionally, remove the message after a few seconds
  setTimeout(() => {
    this.addedToCartMessage = '';
  }, 3000);  // Message will disappear after 3 seconds
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
