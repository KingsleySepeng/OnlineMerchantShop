import {Component, OnInit} from '@angular/core';
import {CartService, CartItem} from "../../core/cart.service";
import {DatePipe, DecimalPipe, NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";

interface StoredOrderPreview {
  order_number?: string;
  created_at: string;
  customer: any;
  totals: {
    subtotal_cents: number;
    shipping_cents: number;
    discount_cents: number;
    pre_tax_total_cents: number;
    gift_wrap_cents: number;
    donation_cents: number;
    tax_cents: number;
    total_cents: number;
  };
  shipping: {
    label: string;
    eta: string;
    amount_cents: number;
  };
  items: CartItem[];
  promoCode?: string | null;
  extras?: {
    gift_wrap: boolean;
    donation_cents: number;
    requested_delivery_date?: string | null;
    notes?: string;
    newsletter_opt_in?: boolean;
  };
}

@Component({
  selector: 'app-thank-you',
  standalone: true,
  imports: [NgIf, NgForOf, DecimalPipe, RouterLink, DatePipe],
  templateUrl: './thank-you.component.html',
  styleUrl: './thank-you.component.css'
})
export class ThankYouComponent implements OnInit {
  order: StoredOrderPreview | null = null;
  loading = true;

  constructor(private cart: CartService) {}

  ngOnInit() {
    this.restoreOrder();
  }

  private restoreOrder() {
    if (typeof window === 'undefined') {
      this.loading = false;
      return;
    }
    try {
      const stored = localStorage.getItem('guest-checkout-last-order');
      if (stored) {
        this.order = JSON.parse(stored);
        this.cart.clear();
      }
    } catch (err) {
      console.warn('Could not restore last order', err);
    } finally {
      this.loading = false;
    }
  }

  clearHistory() {
    if (typeof window === 'undefined') {
      return;
    }
    localStorage.removeItem('guest-checkout-last-order');
    this.order = null;
  }

  get hasInvoiceRequest() {
    return Boolean(this.order?.customer?.request_invoice);
  }
}
