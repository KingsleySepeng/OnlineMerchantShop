import { Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {MainpageComponent} from "./mainpage/mainpage.component";
import {ErrorComponent} from "./error/error.component";
import {CartComponent} from "./cart/cart.component";
import {CheckoutComponent} from "./checkout/checkout.component";
import {LogoutComponent} from "./logout/logout.component";
import {ProductComponent} from "./product/product.component";
import { AuthGaurd } from './services/auth.guard';
import { OrderSucessComponent } from './order-sucess/order-sucess.component';

export const routes: Routes = [
  {path:'',redirectTo:'main-page',pathMatch:'full'},
  {path: 'main-page',component: MainpageComponent},
  {path: 'login',component: LoginComponent},
  {path:'logout',component: LogoutComponent},
  {path: 'sign-up',component: SignupComponent},
  {path: 'shopping-cart',component: CartComponent,canActivate:[AuthGaurd]},
  {path:'checkout',component: CheckoutComponent,canActivate:[AuthGaurd]},
  {path:'product/:id',component: ProductComponent},
  { path: 'order-success', component: OrderSucessComponent },
  {path:'**',component: ErrorComponent}

];



