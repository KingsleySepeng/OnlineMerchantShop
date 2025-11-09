// checkout.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartService } from './cart.service';
import { environment } from '../environment';

export type PayfastMethod =
  | 'ef'  // EFT
  | 'cc'  // Credit card
  | 'dc'  // Debit card
  | 'mp'  // Masterpass
  | 'mc'  // Mobicred
  | 'sc'  // SCode
  | 'ss'  // SnapScan
  | 'zp'  // Zapper
  | 'mt'  // MoreTyme
  | 'rc'  // Store card
  | 'mu'  // Mukuru
  | 'ap'  // Apple Pay
  | 'sp'  // Samsung Pay
  | 'cp'; // Capitec Pay

@Injectable({ providedIn: 'root' })
export class CheckoutService {
  constructor(private http: HttpClient, private cart: CartService) {}

  // If paymentMethod is omitted → PayFast will show ALL options
  async createOrder(
    customer: any,
    opts?: { paymentMethod?: PayfastMethod }
  ) {
    const cart = this.cart.snapshot.map(i => ({
      id: i.product.id,
      name: i.product.name,
      price_cents: i.product.price_cents,
      quantity: i.quantity,
      line_total_cents: this.cart.lineTotal(i)
    }));

    const shipping = this.cart.shippingOption;
    const promo = this.cart.promo;
    const extras = {
      donation_cents: this.cart.donationCents(),
      gift_wrap: this.cart.extras.gift_wrap,
      gift_wrap_cents: this.cart.giftWrapCents(),
    };

    const payload: any = {
      cart,
      customer,
      totals: {
        subtotal_cents: this.cart.subtotalCents(),
        shipping_cents: this.cart.shippingCents(),
        discount_cents: this.cart.discountCents(),
        tax_rate_percent: 15,
        pre_tax_total_cents: this.cart.preTaxTotalCents(),
        donation_cents: extras.donation_cents,
        gift_wrap_cents: extras.gift_wrap_cents,
        tax_cents: this.cart.taxCents(),
        total_cents: this.cart.totalCents(),
        items_count: this.cart.itemCount(),
      },
      shipping,
      promo,
      extras: {
        ...extras,
        requested_delivery_date: customer?.delivery_date || null,
        notes: customer?.notes || '',
        newsletter_opt_in: Boolean(customer?.newsletter_opt_in),
      },
      currency: 'ZAR',
      notify_url: environment.payfast.notify_url,
      return_url: environment.payfast.return_url,
      cancel_url: environment.payfast.cancel_url,
    };

    if (opts?.paymentMethod) {
      payload.payment_method = opts.paymentMethod; // e.g. 'cc'
    }

    return this.http
      .post<{ payment_url: string; order_number: string }>(
        environment.n8nOrderWebhookUrl,
        payload
      )
      .toPromise();
  }
}
