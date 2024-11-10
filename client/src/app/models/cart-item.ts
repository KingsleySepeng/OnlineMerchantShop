import { Product } from './product.model';  // Import the Product model

export interface CartItem {
  product: Product;
  quantity: number;
}

// Add a utility function for calculating total price outside of any class
export function getTotalPrice(cartItem: CartItem): number {
  return cartItem.product.discountedPrice * cartItem.quantity;
}
