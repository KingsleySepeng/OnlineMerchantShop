import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {User} from "../user";
import {FormsModule} from "@angular/forms";
import {NgClass, NgStyle} from "@angular/common";
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    FormsModule, NgStyle,
    NgClass,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit{
 user:User;
passwordMessage:String='';
duplicatePassword:String='';
successMessage:String='';
isSuccess: boolean = false;
isWarning: boolean = false;
isPasswordSuccess: boolean = false;
isPasswordWarning: boolean = false;

  constructor(private router:Router,private authService:AuthService) {
  this.user = new User();
  }

  ngOnInit(): void {
  }

  registerUser():void{
    if(this.user === null|| !this.user.password || !this.duplicatePassword){
      this.isWarning = true;
      this.isSuccess = false;
      this.successMessage = 'Please make sure everything is filled in.'
      return;
    } 
    this.checkPassword();

    if(!this.isPasswordSuccess)
    {this.isWarning = true;
      this.isSuccess = false;
      this.successMessage = this.passwordMessage;
      return;
    }
    this.successMessage = 'you will be redirected to the main page shortly ';
      console.log("SignUp successfull")
      this.isWarning = false;
      this.isSuccess = true;
      setTimeout(()=>{
        this.authService.setLoginStatus(true);
        this.router.navigate(['main-page']);
      },2000);
      console.log( this.user); 
    
    
  }

  checkPassword(): void {
    if (!this.user.password || !this.duplicatePassword) {
      this.passwordMessage = 'Please enter and confirm your password.';
      this.isPasswordSuccess = false;
      this.isPasswordWarning = true;
      return; // Exit early if password fields are empty
    }

    if (this.user.password !== this.duplicatePassword) {
      this.passwordMessage = 'Passwords do not match.';
      this.isPasswordSuccess = false;
      this.isPasswordWarning = true;
    } else {
      this.passwordMessage = 'Passwords match.';
      this.isPasswordSuccess = true;
      this.isPasswordWarning = false;
    }
  }
}
