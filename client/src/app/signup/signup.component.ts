import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {User} from "../user";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit{
//firstname,lastname,phone number,email,password
 user:User;

  constructor(private router:Router) {
  this.user = new User();
  }

  ngOnInit(): void {
  }

  registerUser():void{
    console.log(this.user + 'singed up');
  }
}
