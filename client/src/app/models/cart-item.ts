import { Product } from './product.model';  // Import the Product model

export class CartItem {
  // Private fields
  private _product: Product;
  private _quantity: number;

  // Constructor to initialize fields
  constructor(product: Product, quantity: number = 1) {
    this._product = product;
    this._quantity = quantity;
  }

  // Getter for product
  public get product(): Product {
    return this._product;
  }

  // Setter for product
  public set product(value: Product) {
    this._product = value;
  }

  // Getter for quantity
  public get quantity(): number {
    return this._quantity;
  }

  // Setter for quantity with validation
  public set quantity(value: number) {
    if (value > 0) {
      this._quantity = value;
    } else {
      throw new Error('Quantity must be greater than 0');
    }
  }

  // Method to calculate total price
  public getTotalPrice(): number {
    return this._product.discountedPrice * this._quantity;
  }
}
