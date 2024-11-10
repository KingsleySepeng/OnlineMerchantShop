import { Component } from '@angular/core';
import { CartItem } from '../models/cart-item';
import { CartService } from '../services/cart.service';
import {Router} from "@angular/router";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CheckoutService } from '../services/checkout.service';
import { map, Observable, switchMap, tap } from 'rxjs';
import { Order } from '../models/order.model';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})

export class CheckoutComponent {
  cartItems: CartItem[] = [];  // Cart items
  totalAmount: number = 0;     // Total price of the cart
  fullName: string = '';       // Shipping details
  address: string = '';
  city: string = '';
  postalCode: string = '';
  cardName: string = '';       // Payment details
  cardNumber: string = '';
  cardExpiry: string = '';
  cardCVC: string = '';

  constructor(private cartService:CartService,private router:Router){}

  ngOnInit(){
    // this.cartItems = this.cartService.getCartItems();
    this.calculateTotal();
  }

  calculateTotal():void{
    this.totalAmount = this.cartItems.reduce((total, item) => total + (item.product.discountedPrice * item.quantity), 0);
  }

  onSubmit() {
    // You can add form validation here before proceeding

    // Simulate a payment processing (for now, we'll just navigate to a success page)
    console.log('Processing payment...');
    console.log(`Name: ${this.fullName}`);
    console.log(`Address: ${this.address}, ${this.city}, ${this.postalCode}`);
    console.log(`Card: ${this.cardName}, ${this.cardNumber}, ${this.cardExpiry}, ${this.cardCVC}`);
    
    // For now, navigate to a success page or display a success message
    this.cartService.clearCart();
    this.router.navigate(['/order-success']);
  }
}
