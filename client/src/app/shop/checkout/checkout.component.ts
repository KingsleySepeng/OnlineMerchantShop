import { Component } from '@angular/core';
import {CartItem, CartService, ShippingOption} from "../../core/cart.service";
import {CheckoutService, PayfastMethod} from "../../core/checkout.service";
import {RouterLink} from "@angular/router";
import {DecimalPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

const CUSTOMER_STORAGE_KEY = 'guest-checkout-customer-details';

interface StoredOrderPreview {
  order_number?: string;
  created_at: string;
  customer: any;
  totals: {
    subtotal_cents: number;
    shipping_cents: number;
    discount_cents: number;
    total_cents: number;
  };
  shipping: ShippingOption;
  items: CartItem[];
  promoCode?: string | null;
}

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgClass,
    DecimalPipe,
    FormsModule,
    RouterLink
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  customer = { name: '', email: '', phone: '', address_line1: '', city: '', region: '', postal_code: '', notes: '' };
  submitting = false;
  attemptedSubmit = false;
  promoCode = '';
  promoFeedback = '';
  paymentMethod: PayfastMethod | 'all' = 'all';
  paymentMethods = [
    { id: 'all', label: 'Show all options at PayFast' },
    { id: 'cc', label: 'Credit / Cheque card' },
    { id: 'ef', label: 'Instant EFT' },
    { id: 'mt', label: 'PayFast MoreTyme' },
    { id: 'ss', label: 'SnapScan' },
    { id: 'cp', label: 'Capitec Pay' },
  ];

  constructor(public cart: CartService, private checkout: CheckoutService) {
  }

  ngOnInit() {
    if (typeof window === 'undefined') {
      return;
    }
    try {
      const stored = localStorage.getItem(CUSTOMER_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        this.customer = { ...this.customer, ...parsed };
      }
    } catch (err) {
      console.warn('Could not restore customer details', err);
    }
  }

  get cartItems() {
    return this.cart.snapshot;
  }

  get subtotal() {
    return this.cart.subtotalCents();
  }

  get discount() {
    return this.cart.discountCents();
  }

  get shipping() {
    return this.cart.shippingCents();
  }

  get total() {
    return this.cart.totalCents();
  }

  get selectedShippingId() {
    return this.cart.shippingOption.id;
  }

  get promo() {
    return this.cart.promo;
  }

  get cartIsEmpty() {
    return !this.cart.hasItems();
  }

  get isEmailValid() {
    if (!this.customer.email) {
      return false;
    }
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.customer.email);
  }

  get isPhoneValid() {
    if (!this.customer.phone) {
      return false;
    }
    return /^[0-9+()\s-]{7,}$/.test(this.customer.phone);
  }

  get formInvalid() {
    const requiredFields = [
      this.customer.name,
      this.customer.email,
      this.customer.phone,
      this.customer.address_line1,
      this.customer.city,
      this.customer.region,
      this.customer.postal_code,
    ];
    const missing = requiredFields.some(v => !v || !v.toString().trim());
    return missing || !this.isEmailValid || !this.isPhoneValid;
  }

  persistCustomer() {
    if (typeof window === 'undefined') {
      return;
    }
    try {
      localStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(this.customer));
    } catch (err) {
      console.warn('Could not persist customer details', err);
    }
  }

  updateQuantity(item: CartItem, quantity: number) {
    this.cart.updateQuantity(item.product.id, quantity);
  }

  increment(item: CartItem) {
    this.updateQuantity(item, item.quantity + 1);
  }

  decrement(item: CartItem) {
    this.updateQuantity(item, item.quantity - 1);
  }

  removeItem(item: CartItem) {
    this.cart.remove(item.product.id);
  }

  changeShipping(optionId: string) {
    this.cart.setShippingOption(optionId);
  }

  applyPromo() {
    const result = this.cart.applyPromo(this.promoCode);
    this.promoFeedback = result.message;
    if (result.success) {
      this.promoCode = '';
    }
  }

  clearPromo() {
    this.cart.removePromo();
    this.promoFeedback = 'Promo removed.';
  }

  private storeOrderPreview(orderNumber?: string) {
    if (typeof window === 'undefined') {
      return;
    }
    const snapshot: StoredOrderPreview = {
      order_number: orderNumber,
      created_at: new Date().toISOString(),
      customer: this.customer,
      totals: {
        subtotal_cents: this.subtotal,
        shipping_cents: this.shipping,
        discount_cents: this.discount,
        total_cents: this.total,
      },
      shipping: this.cart.shippingOption,
      items: this.cart.snapshot,
      promoCode: this.cart.promo?.code ?? null,
    };
    try {
      localStorage.setItem('guest-checkout-last-order', JSON.stringify(snapshot));
    } catch (err) {
      console.warn('Could not persist order preview', err);
    }
  }

  async pay() {
    this.attemptedSubmit = true;
    if (this.cartIsEmpty) {
      alert('Your cart is empty. Add items before checking out.');
      return;
    }
    if (this.formInvalid) {
      return;
    }

    this.submitting = true;
    try {
      const opts = this.paymentMethod === 'all' ? undefined : { paymentMethod: this.paymentMethod };
      const resp = await this.checkout.createOrder(this.customer, opts);
      if (resp) {
        this.storeOrderPreview(resp.order_number);
      }
      if (resp?.payment_url) {
        window.location.href = resp.payment_url; // redirect to PayFast
      }
    } catch (e) {
      alert('Could not start payment.');
    } finally {
      this.submitting = false;
    }
  }
}
