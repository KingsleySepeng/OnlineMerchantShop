import { Component, NgModule, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { CartService } from '../cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartItem } from '../models/cart-item';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{

  cartItems:CartItem[]=[];
  successMessage:String='';
  warningMessages:{[key:string]:string}={};

  constructor(private router:Router,private cartService:CartService) {
  }

  ngOnInit():void{this.cartItems=this.cartService.getCartItems();}

  handleCheckout():void{
    this.router.navigate(['checkout'])
  }

  removeFromCart(item:CartItem){
    this.cartService.removeFromCart(item);
    this.cartItems = this.cartService.getCartItems();
    this.successMessage = 'Cart updated successfully!';
  }

  updateCart(){
    this.warningMessages = {};  // Clear previous warnings
    this.successMessage = '';    // Track if there are warnings
    if(Object.keys(this.warningMessages).length>0){
      this.successMessage = 'Please correct the quantities exceeding stock before updating the cart.';
      return;
    }
    this.successMessage = '';

    this.cartItems.forEach(item=>{
       if(item.quantity<1){
        item.quantity=1;
      }
      this.cartService.updateCartItemQuantity(item,item.quantity);
    });
    this.successMessage = 'Cart updated successfully!';
  }

  // Method to check if there are any warnings
  hasWarnings(): boolean {
    return Object.keys(this.warningMessages).length > 0;
  }

  validateQuantity(item:CartItem):void{
    if (item.quantity > item.product.stock) {
      this.warningMessages[item.product.id] = `The quantity for ${item.product.name} exceeds available stock (${item.product.stock} available).`;
    } else {
      delete this.warningMessages[item.product.id];  // Clear the warning if quantity is valid
    }
  }

  calculateTotal():string{
    return this.cartItems
    .reduce((total,item)=>total + item.getTotalPrice(),0)
    .toFixed(2);
  }

  // Clear the cart by using the CartService
  clearCart(): void {
    this.cartService.clearCart();
    this.cartItems = [];
    this.successMessage = 'Cart cleared successfully!';
    this.warningMessages = {};  // Clear any warnings when cart is cleared
  }
  
  isCartEmpty():boolean{
    return this.cartItems.length ===0;
  }
}
