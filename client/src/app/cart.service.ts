import { Injectable } from '@angular/core';
import { Product } from './models/product.model';
import { CartItem } from './models/cart-item';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems:CartItem[]=[];
  private cartQuantitySubject :BehaviorSubject<number> = new BehaviorSubject(0);
  
  constructor() { }
  
  getCartQuantity():Observable<number>{
    return this.cartQuantitySubject.asObservable();
  }

  getCartItems():CartItem[]{
    return this.cartItems;
  }
  
    // Update the cart quantity
    private updateCartQuantity(): void {
      const totalQuantity = this.cartItems.reduce((total, item) => total + item.quantity, 0);
      this.cartQuantitySubject.next(totalQuantity);  // Emit the updated quantity
    }

  addToCart(product:Product,quantity:number=1):void{
    const exisitngItem = this.cartItems.find(item=>item.product.id===product.id);
    if(exisitngItem){
      exisitngItem.quantity+=quantity;
    }else{

      this.cartItems.push(new CartItem(product,quantity));
    }
    this.updateCartQuantity();
  }

  removeFromCart(cartItem:CartItem):void{
    this.cartItems=this.cartItems.filter(item=>item !== cartItem);
    this.updateCartQuantity();
  }

  updateCartItemQuantity(cartItem:CartItem,quantity:number):void{
    const item = this.cartItems.find(item=>item=== cartItem);
    if(item&&quantity>0){
      item.quantity = quantity;
    }
    this.updateCartQuantity();
  }

  clearCart():void{
     this.cartItems=[];
    this.updateCartQuantity();
  }

}
