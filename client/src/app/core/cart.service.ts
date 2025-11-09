import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import type {Product} from './product.service';


export interface CartItem {
  product: Product;
  quantity: number
}


@Injectable({providedIn: 'root'})
export class CartService {
  private items$ = new BehaviorSubject<CartItem[]>([]);


  get value$() {
    return this.items$.asObservable();
  }

  get snapshot() {
    return this.items$.value;
  }


  add(product: Product, quantity = 1) {
    const items = [...this.snapshot];
    const idx = items.findIndex(i => i.product.id === product.id);
    if (idx > -1) items[idx] = {...items[idx], quantity: items[idx].quantity + quantity};
    else items.push({product, quantity});
    this.items$.next(items);
  }

  remove(productId: number) {
    this.items$.next(this.snapshot.filter(i => i.product.id !== productId));
  }

  clear() {
    this.items$.next([]);
  }


  totalCents() {
    return this.snapshot.reduce((sum, i) => sum + i.product.price_cents * i.quantity, 0);
  }
}
