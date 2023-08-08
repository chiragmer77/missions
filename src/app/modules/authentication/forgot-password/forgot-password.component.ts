import { Component } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  email: any = '';
  isLoading = false;


  submitForm(form: any) {
    // Do something with the form data, such as sending it to the server
    console.log('Email submitted:', this.email);
  }
}
