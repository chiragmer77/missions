import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { LoginComponent } from './modules/authentication/authentication/login/login.component';
import { ForgotPasswordComponent } from './modules/authentication/authentication/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './modules/authentication/authentication/reset-password/reset-password.component';
import { TestComponent } from './shared/components/test/test.component';
import { TestDirective } from './shared/directives/test.directive';
import { TestPipe } from './shared/pipe/test.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    TestComponent,
    TestDirective,
    TestPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
