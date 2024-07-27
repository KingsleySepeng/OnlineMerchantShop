import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  constructor(private router:Router) {
  }
  handleCheckout():void{
    this.router.navigate(['checkout'])
  }
}
