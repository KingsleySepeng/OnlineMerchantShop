import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CartItem } from '../models/cart-item';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private apiUrl = 'http://localhost:8080/api/checkout';
  constructor(private http: HttpClient) { }

  // Validate cart items (you might need an endpoint for this if it's required to be done separately)
  validateCartItems(cartItems: any[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/validate`, cartItems);
  }

  // Process checkout which creates the order
  processOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/processOrder`, order);
  }
  
}
