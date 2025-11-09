import {Component} from '@angular/core';
import {CartService, CartItem} from "../../core/cart.service";
import {DecimalPipe, NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-cancelled',
  standalone: true,
  imports: [NgIf, NgForOf, DecimalPipe, RouterLink],
  templateUrl: './cancelled.component.html',
  styleUrl: './cancelled.component.css'
})
export class CancelledComponent {
  constructor(public cart: CartService) {}

  get items(): CartItem[] {
    return this.cart.snapshot;
  }

  get subtotal() {
    return this.cart.subtotalCents();
  }

  get shipping() {
    return this.cart.shippingCents();
  }

  get discount() {
    return this.cart.discountCents();
  }

  get total() {
    return this.cart.totalCents();
  }
}
