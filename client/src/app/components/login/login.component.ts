import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";

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

  constructor(){
    this.loginForm = this.formBuilder.group({
      email:[''],
      password:[''],
    });
  }

  login():void{
    console.log(this.loginForm.controls['email'].value);
    console.log(this.loginForm.controls['password'].value);
  }

}
