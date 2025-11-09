import {Routes} from "@angular/router";
import {ShopComponent} from "./shop/shop/shop.component";
import {CheckoutComponent} from "./shop/checkout/checkout.component";


export const routes: Routes = [
  { path: '', component: ShopComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: '**', redirectTo: '' }

];



