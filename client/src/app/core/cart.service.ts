import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import type {Product} from './product.service';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ShippingOption {
  id: string;
  label: string;
  description: string;
  amount_cents: number;
  eta: string;
}

type PromoType = 'percent' | 'fixed' | 'free-shipping';

interface PromoDefinition {
  code: string;
  type: PromoType;
  value: number;
  description: string;
  minimumSubtotalCents?: number;
}

export interface AppliedPromo extends PromoDefinition {}

export interface CartExtras {
  donation_cents: number;
  gift_wrap: boolean;
}

interface StoredCartState {
  items: CartItem[];
  shippingId: string;
  promoCode: string | null;
  extras: CartExtras;
}

@Injectable({providedIn: 'root'})
export class CartService {
  private readonly storageKey = 'guest-checkout-cart-state-v1';
  private readonly vatRate = 0.15;
  private readonly giftWrapFeeCents = 2500;
  readonly donationPresets = [0, 1000, 2500, 5000];

  private readonly shippingOptionsList: ShippingOption[] = [
    {
      id: 'standard',
      label: 'Standard courier',
      description: 'Delivery nationwide in 2-4 business days',
      amount_cents: 6500,
      eta: '2-4 business days'
    },
    {
      id: 'express',
      label: 'Express overnight',
      description: 'Priority overnight delivery to major centres',
      amount_cents: 12900,
      eta: 'Next business day'
    },
    {
      id: 'pickup',
      label: 'Collect in store',
      description: 'Free pickup from our Cape Town warehouse',
      amount_cents: 0,
      eta: 'Ready within 24 hours'
    }
  ];

  private readonly promoDefinitions: PromoDefinition[] = [
    {
      code: 'SAVE10',
      type: 'percent',
      value: 10,
      description: '10% off orders of R200 or more',
      minimumSubtotalCents: 20000
    },
    {
      code: 'WELCOME50',
      type: 'fixed',
      value: 5000,
      description: 'R50 welcome discount on orders above R150',
      minimumSubtotalCents: 15000
    },
    {
      code: 'FREESHIP',
      type: 'free-shipping',
      value: 100,
      description: 'Free standard shipping over R300',
      minimumSubtotalCents: 30000
    }
  ];

  private items$ = new BehaviorSubject<CartItem[]>([]);
  private shippingSelection$ = new BehaviorSubject<ShippingOption>(this.shippingOptionsList[0]);
  private promo$ = new BehaviorSubject<AppliedPromo | null>(null);
  private extras$ = new BehaviorSubject<CartExtras>({donation_cents: 0, gift_wrap: false});

  constructor() {
    this.restoreFromStorage();

    this.items$.subscribe(() => this.persist());
    this.shippingSelection$.subscribe(() => this.persist());
    this.promo$.subscribe(() => this.persist());
    this.extras$.subscribe(() => this.persist());
  }

  get value$() {
    return this.items$.asObservable();
  }

  get snapshot() {
    return this.items$.value;
  }

  get shippingOptions(): ShippingOption[] {
    return this.shippingOptionsList;
  }

  get shippingOption(): ShippingOption {
    return this.shippingSelection$.value;
  }

  get promo(): AppliedPromo | null {
    return this.promo$.value;
  }

  get extras(): CartExtras {
    return this.extras$.value;
  }

  add(product: Product, quantity = 1) {
    const items = [...this.snapshot];
    const idx = items.findIndex(i => i.product.id === product.id);
    if (idx > -1) {
      const updatedQty = items[idx].quantity + quantity;
      items[idx] = {...items[idx], quantity: updatedQty};
    } else {
      items.push({product, quantity});
    }
    this.items$.next(items);
  }

  updateQuantity(productId: number, quantity: number) {
    if (quantity <= 0) {
      this.remove(productId);
      return;
    }
    const items = this.snapshot.map(item =>
      item.product.id === productId ? {...item, quantity} : item
    );
    this.items$.next(items);
  }

  remove(productId: number) {
    this.items$.next(this.snapshot.filter(i => i.product.id !== productId));
  }

  clear() {
    this.items$.next([]);
    this.shippingSelection$.next(this.shippingOptionsList[0]);
    this.promo$.next(null);
    this.extras$.next({donation_cents: 0, gift_wrap: false});
  }

  subtotalCents() {
    return this.snapshot.reduce((sum, i) => sum + i.product.price_cents * i.quantity, 0);
  }

  discountCents() {
    const promo = this.promo$.value;
    if (!promo) {
      return 0;
    }
    const subtotal = this.subtotalCents();
    if (promo.type === 'percent') {
      return Math.floor((subtotal * promo.value) / 100);
    }
    if (promo.type === 'fixed') {
      return Math.min(promo.value, subtotal);
    }
    if (promo.type === 'free-shipping') {
      const shipping = this.shippingSelection$.value.amount_cents;
      return shipping;
    }
    return 0;
  }

  shippingCents() {
    const shipping = this.shippingSelection$.value.amount_cents;
    if (this.promo$.value?.type === 'free-shipping') {
      return 0;
    }
    return shipping;
  }

  giftWrapCents() {
    return this.extras$.value.gift_wrap ? this.giftWrapFeeCents : 0;
  }

  giftWrapFee() {
    return this.giftWrapFeeCents;
  }

  donationCents() {
    return Math.max(this.extras$.value.donation_cents || 0, 0);
  }

  private taxableBaseCents() {
    const subtotal = this.subtotalCents();
    const shipping = this.shippingCents();
    const discount = this.discountCents();
    const giftWrap = this.giftWrapCents();
    return Math.max(subtotal + shipping + giftWrap - discount, 0);
  }

  taxCents() {
    return Math.floor(this.taxableBaseCents() * this.vatRate);
  }

  netTotalCents() {
    const donation = this.donationCents();
    return this.taxableBaseCents() + donation;
  }

  totalCents() {
    return this.grandTotalCents();
  }

  preTaxTotalCents() {
    return this.taxableBaseCents();
  }

  grandTotalCents() {
    return this.netTotalCents() + this.taxCents();
  }

  itemCount() {
    return this.snapshot.reduce((sum, item) => sum + item.quantity, 0);
  }

  lineTotal(item: CartItem) {
    return item.product.price_cents * item.quantity;
  }

  setShippingOption(optionId: string) {
    const option = this.shippingOptionsList.find(o => o.id === optionId);
    if (option) {
      this.shippingSelection$.next(option);
    }
  }

  setDonation(amountCents: number) {
    const donation = Number.isFinite(amountCents) ? Math.max(Math.floor(amountCents), 0) : 0;
    this.extras$.next({...this.extras$.value, donation_cents: donation});
  }

  setGiftWrap(enabled: boolean) {
    this.extras$.next({...this.extras$.value, gift_wrap: Boolean(enabled)});
  }

  applyPromo(code: string) {
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) {
      return {success: false, message: 'Enter a promo code to apply it.'};
    }
    const rule = this.promoDefinitions.find(p => p.code === trimmed);
    if (!rule) {
      return {success: false, message: 'That promo code is not recognised.'};
    }
    const subtotal = this.subtotalCents();
    if (rule.minimumSubtotalCents && subtotal < rule.minimumSubtotalCents) {
      return {
        success: false,
        message: `Add R ${((rule.minimumSubtotalCents - subtotal) / 100).toFixed(2)} more to use this code.`,
      };
    }
    this.promo$.next({...rule});
    return {success: true, message: `${rule.code} applied – ${rule.description}.`};
  }

  removePromo() {
    this.promo$.next(null);
  }

  hasItems() {
    return this.snapshot.length > 0;
  }

  private restoreFromStorage() {
    if (typeof window === 'undefined') {
      return;
    }
    try {
      const storedRaw = localStorage.getItem(this.storageKey);
      if (!storedRaw) {
        return;
      }
      const stored: StoredCartState = JSON.parse(storedRaw);
      if (stored.items) {
        this.items$.next(stored.items);
      }
      const option = this.shippingOptionsList.find(o => o.id === stored.shippingId);
      if (option) {
        this.shippingSelection$.next(option);
      }
      const code = stored.promoCode ?? undefined;
      if (code) {
        const promo = this.promoDefinitions.find(p => p.code === code.toUpperCase());
        if (promo) {
          this.promo$.next({...promo});
        }
      }
      if (stored.extras) {
        this.extras$.next({
          donation_cents: Math.max(stored.extras.donation_cents || 0, 0),
          gift_wrap: Boolean(stored.extras.gift_wrap),
        });
      }
    } catch (err) {
      console.warn('Could not restore cart from storage', err);
    }
  }

  private persist() {
    if (typeof window === 'undefined') {
      return;
    }
    const state: StoredCartState = {
      items: this.snapshot,
      shippingId: this.shippingSelection$.value.id,
      promoCode: this.promo$.value?.code ?? null,
      extras: this.extras$.value,
    };
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(state));
    } catch (err) {
      console.warn('Could not persist cart', err);
    }
  }
}
