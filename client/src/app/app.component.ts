import {Component} from '@angular/core';
import {DecimalPipe, NgIf} from "@angular/common";
import {RouterLink, RouterOutlet} from "@angular/router";
import {CartService} from "./core/cart.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgIf, DecimalPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'My Shop';

  constructor(public cart: CartService) {}

  get cartSummary() {
    const count = this.cart.itemCount();
    const subtotal = this.cart.subtotalCents();
    const tax = this.cart.taxCents();
    const donation = this.cart.donationCents();
    const giftWrap = this.cart.giftWrapCents();
    const total = this.cart.totalCents();
    return {
      count,
      subtotal,
      tax,
      donation,
      giftWrap,
      total,
    };
  }
}
