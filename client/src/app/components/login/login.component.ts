import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {UserRequest} from "../../models/user-request";
import {UserResponse} from "../../models/user-response";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private formBuilder = inject(FormBuilder);
  loginForm: FormGroup;

  constructor(private userService:UserService) {
    this.loginForm = this.formBuilder.group({
      email:[''],
      password:[''],
    });
  }

  login():void{
    console.log(this.loginForm.controls['email'].value);
    console.log(this.loginForm.controls['password'].value);
    const userRequest:UserRequest = {
      email:this.loginForm.controls['email'].value,
      password:this.loginForm.controls['password'].value,
    };

    this.userService.login(userRequest).subscribe({
      next:(userResponse: UserResponse) => {
        if(userResponse === null){
          alert("User doesnt exist");
          return;
        }
        console.log(userResponse)
        alert(`Welcome Back ${userResponse.email}`);
      },
      error:(error)=>{
        alert(error.message);
      }
    })

  }

}
