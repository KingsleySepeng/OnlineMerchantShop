import { Component } from '@angular/core';
import {Product, ProductService} from "../../core/product.service";
import {CartService} from "../../core/cart.service";
import {DecimalPipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    DecimalPipe
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent {
  products: Product[] = [];
  loading = true;
  constructor(private productSvc: ProductService, private cart: CartService) {}
  async ngOnInit() {
    this.products = await this.productSvc.list();
    this.loading = false;
  }
  add(p: Product) { this.cart.add(p, 1); }
}
