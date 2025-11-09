import { Component } from '@angular/core';
import {DecimalPipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Product, ProductService} from "../../core/product.service";
import {CartService} from "../../core/cart.service";

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    DecimalPipe,
    FormsModule
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent {
  products: Product[] = [];
  loading = true;
  error = '';
  searchTerm = '';
  sortOption: 'featured' | 'price-asc' | 'price-desc' | 'name' = 'featured';
  selectedProduct: Product | null = null;
  lastAddedId: number | null = null;

  constructor(private productSvc: ProductService, private cart: CartService) {}

  async ngOnInit() {
    await this.loadProducts();
  }

  private async loadProducts() {
    this.loading = true;
    this.error = '';
    try {
      this.products = await this.productSvc.list();
    } catch (err) {
      console.error(err);
      this.error = 'We could not load products right now. Please try again later.';
    } finally {
      this.loading = false;
    }
  }

  get filteredProducts() {
    let list = [...this.products];
    if (this.searchTerm.trim()) {
      const query = this.searchTerm.trim().toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(query)
      );
    }
    switch (this.sortOption) {
      case 'price-asc':
        list.sort((a, b) => a.price_cents - b.price_cents);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price_cents - a.price_cents);
        break;
      case 'name':
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }
    return list;
  }

  add(p: Product) {
    this.cart.add(p, 1);
    this.lastAddedId = p.id;
    setTimeout(() => {
      if (this.lastAddedId === p.id) {
        this.lastAddedId = null;
      }
    }, 2000);
  }

  async retry() {
    await this.loadProducts();
  }

  viewDetails(product: Product) {
    this.selectedProduct = product;
  }

  closeDetails() {
    this.selectedProduct = null;
  }

  trackByProduct(_index: number, product: Product) {
    return product.id;
  }
}
