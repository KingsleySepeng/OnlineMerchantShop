import { Component } from '@angular/core';
import {CartService} from "../../core/cart.service";
import {CheckoutService} from "../../core/checkout.service";
import {Router} from "@angular/router";
import {DecimalPipe, NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    NgForOf,
    DecimalPipe,
    FormsModule
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  customer = { name: '', email: '', phone: '', address_line1: '', city: '', region: '', postal_code: '' };
  submitting = false;
  constructor(public cart: CartService, private checkout: CheckoutService, private router: Router) {}


  async pay() {
    this.submitting = true;
    try {
      const resp = await this.checkout.createOrder(this.customer);
      if (resp?.payment_url) window.location.href = resp.payment_url; // redirect to PayFast
    } catch (e) {
      alert('Could not start payment.');
    } finally {
      this.submitting = false;
    }
  }
}
