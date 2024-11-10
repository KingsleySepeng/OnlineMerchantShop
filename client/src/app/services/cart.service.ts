import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { CartItem } from '../models/cart-item';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems:CartItem[]=[];
  private apiUrl = 'http://localhost:8080/api/cart';
  private cartQuantitySubject :BehaviorSubject<number> = new BehaviorSubject(0);
  
  constructor(private http:HttpClient) { }
  
  getCartQuantity():Observable<number>{
    return this.cartQuantitySubject.asObservable();
  }

  getCartItems():Observable<CartItem[]>{
  return this.http.get<CartItem[]>(`${this.apiUrl}/items`);
  }
  
    // Update the cart quantity
    private updateCartQuantity(): void {
      this.getCartItems().subscribe(items=>{
        const totalQuantity = this.cartItems.reduce((total, item) => total + item.quantity, 0);
        this.cartQuantitySubject.next(totalQuantity);  // Emit the updated quantity
      })
    }

  addToCart(product:Product,quantity:number=1):Observable<any>{
    return this.http.post(`${this.apiUrl}/add`, {productId: product.id, quantity}).pipe(
      tap(()=>this.updateCartQuantity()));
  }

  removeFromCart(cartItem:CartItem):Observable<any>{
    return this.http.delete(`${this.apiUrl}/remove/${cartItem.product.id}`).pipe(
      tap(()=>this.updateCartQuantity())
    );
  }

  updateCartItemQuantity(cartItem:CartItem,quantity:number):Observable<any>{
    return this.http.put(`${this.apiUrl}/update${cartItem.product.id}`,{quantity}).pipe(
      tap(()=>this.updateCartQuantity())
    );
  }

  clearCart():Observable<any>{
    return this.http.delete(`${this.apiUrl}/clear`).pipe(
      tap(()=>{
        this.cartItems = [];
        this.cartQuantitySubject.next(0);  // Reset the cart quantity to 0
      })
    );
  }
}

