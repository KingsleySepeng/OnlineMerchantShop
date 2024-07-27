import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass, NgStyle} from "@angular/common";
import {AuthService} from "../auth.service";
import {User} from "../user";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    NgStyle,
    NgClass,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent implements OnInit{
  // email: String = '';
  // password:String = '';
  successMessage:String='';
  isWarning:Boolean = false;
  isSuccess:Boolean = false;

  user:User;
  constructor(private router:Router,private authService:AuthService) {
  this.user = new User();
  }

ngOnInit():void{
}

  login(): void{
    if(this.user.email === 'king@gmail.com' && this.user.password === '1234'){
      this.successMessage = "Login successfull, you'll be redirected to the main page shortly";
      this.isSuccess = true;
      this.isWarning = false;
      console.log("Login successfull")
      setTimeout(()=>{
        this.authService.setLoginStatus(true);
        this.router.navigate(['main']);
      },2000);
    }else {
      console.log("Login not successfull")
      this.successMessage = "Please make sure you have entered the correct credentials!";
      this.isSuccess = false;
      this.isWarning = true;
    }
  }
}
