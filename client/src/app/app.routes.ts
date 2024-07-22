import { Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {MainpageComponent} from "./mainpage/mainpage.component";
import {ErrorComponent} from "./error/error.component";
import {CartComponent} from "./cart/cart.component";
import {CheckoutComponent} from "./checkout/checkout.component";
import {LogoutComponent} from "./logout/logout.component";

export const routes: Routes = [
  {path:'',component:LoginComponent},
  {path: 'login',component: LoginComponent},
  {path:'logout',component: LogoutComponent},
  {path: 'signup',component: SignupComponent},
  {path: 'main',component: MainpageComponent},
  {path: 'cart',component: CartComponent},
  {path:'checkout',component: CheckoutComponent},

  {path:'error',component: ErrorComponent}

];



