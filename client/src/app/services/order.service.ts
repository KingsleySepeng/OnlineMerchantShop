import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'http://localhost:8080/api/orders';
  constructor(private http:HttpClient) { }

  createOrder(order:Order):Observable<Order>{
    return this.http.post<Order>(this.apiUrl,order);
  }

getOrderById(orderId:number,order:Order):Observable<Order>{
  return this.http.get<Order>(`${this.apiUrl}/${orderId}`);
}

updateOrder(orderId:number,order:Order):Observable<Order>{
  return this.http.put<Order>(`${this.apiUrl}/${orderId}`,order)
}

deleteOrder(orderId:number):Observable<void>{
  return this.http.delete<void>(`${this.apiUrl}/${orderId}`);
}

// get all orders

}
