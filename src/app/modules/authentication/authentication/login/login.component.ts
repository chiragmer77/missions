import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup | any;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm!.valid) {
      // Implement your login logic here
      const email = this.loginForm!.value.email;
      const password = this.loginForm!.value.password;
      // For demonstration purposes, you can log the credentials
      console.log('Email:', email);
      console.log('Password:', password);
    }
  }


}
