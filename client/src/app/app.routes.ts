import {Routes} from "@angular/router";
import {ShopComponent} from "./shop/shop/shop.component";
import {CheckoutComponent} from "./shop/checkout/checkout.component";
import {ThankYouComponent} from "./shop/thank-you/thank-you.component";
import {CancelledComponent} from "./shop/cancelled/cancelled.component";


export const routes: Routes = [
  { path: '', component: ShopComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'thank-you', component: ThankYouComponent },
  { path: 'cancelled', component: CancelledComponent },
  { path: '**', redirectTo: '' }

];



