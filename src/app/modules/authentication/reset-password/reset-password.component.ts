import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmedValidator } from './confirmed';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  resetPasswordForm: FormGroup | any;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      reenterPassword: ['', Validators.required]
    }, { validator: ConfirmedValidator('newPassword', 'reenterPassword') });


  }

  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('newPassword')!.value;
    const confirmPassword = control.get('reenterPassword')!.value;
    if (password !== confirmPassword) {
      control.get('reenterPassword')!.setErrors({ passwordMismatch: true });
    } else {
      control.get('reenterPassword')!.setErrors(null);
    }
  }

  submitForm() {
    if (this.resetPasswordForm.valid) {
      const newPassword = this.resetPasswordForm.get('newPassword').value;
      // Perform password reset logic here
    }
  }
}