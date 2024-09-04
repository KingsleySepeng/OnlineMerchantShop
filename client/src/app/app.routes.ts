import { Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {MainpageComponent} from "./mainpage/mainpage.component";
import {ErrorComponent} from "./error/error.component";
import {CartComponent} from "./cart/cart.component";
import {CheckoutComponent} from "./checkout/checkout.component";
import {LogoutComponent} from "./logout/logout.component";
import {ProductComponent} from "./product/product.component";
import { AuthGaurd } from './auth.guard';

export const routes: Routes = [
  {path:'',redirectTo:'/main-page',pathMatch:'full'},
  {path: 'login',component: LoginComponent},
  {path:'logout',component: LogoutComponent},
  {path: 'sign-up',component: SignupComponent},
  {path: 'main-page',component: MainpageComponent,canActivate:[AuthGaurd]},
  {path: 'shopping-cart',component: CartComponent,canActivate:[AuthGaurd]},
  {path:'checkout',component: CheckoutComponent,canActivate:[AuthGaurd]},
  {path:'product',component: ProductComponent,canActivate:[AuthGaurd]},
  {path:'**',component: ErrorComponent}

];



