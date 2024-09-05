import { Component } from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {AuthService} from "../auth.service";
import {NgIf} from "@angular/common";
import { CartService } from '../cart.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgIf
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {

  cartQuantity:number=0;
  
  constructor(public authService: AuthService,private router:Router,private cartService:CartService) {
  }

  ngOnInit(): void {
    // Subscribe to cart changes to keep track of quantity
    this.cartService.getCartQuantity().subscribe(quantity => {
      this.cartQuantity = quantity;
    });
  }

  logout():void{
    this.authService.logout();
    this.router.navigate(['main-page'])
  }
}
