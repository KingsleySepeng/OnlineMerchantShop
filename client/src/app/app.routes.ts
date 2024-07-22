import { Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {MainpageComponent} from "./mainpage/mainpage.component";
import {ErrorComponent} from "./error/error.component";

export const routes: Routes = [
  {path:'',component:LoginComponent},
  {path: 'login',component: LoginComponent},
  {path: 'signup',component: SignupComponent},
  {path: 'main',component: MainpageComponent},


  {path:'error',component: ErrorComponent}

];



