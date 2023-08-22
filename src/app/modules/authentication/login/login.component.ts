import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup | any;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private apiService: ApiService,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  /** User login  */
  onSubmit() {
    if (this.loginForm!.valid) {
      this.isLoading = true;
      const payload: any = {
        username: this.loginForm!.value.email,
        granttype: 'password',
        password: this.loginForm!.value.password,
        grant_type: 'password',
        scope: 'openid email profile offline_access roles'
      }
      this.apiService.connectAuth('connect/token', payload).subscribe((res: any) => {
        const token = this.jwtHelper.decodeToken(res.id_token);
        localStorage.setItem('decode-IdToken',JSON.stringify(token));
        // Handle the successful response here
        localStorage.setItem('authToken', res.access_token);
        this.isLoading = false;
        this.router.navigateByUrl('/dashboard');
        this.toastr.success('Login successfully');
      },
        (error: any) => {
          // Handle the error here
          this.isLoading = false;
        })
    }
  }


}
