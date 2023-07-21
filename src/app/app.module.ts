import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/authentication/login/login.component';
import { ForgotPasswordComponent } from './modules/authentication/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './modules/authentication/reset-password/reset-password.component';
import { TestComponent } from './shared/components/test/test.component';
import { TestDirective } from './shared/directives/test.directive';
import { TestPipe } from './shared/pipe/test.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './modules/layout/header/header.component';
import { RouterOutletComponent } from './modules/layout/router-outlet/router-outlet.component'; // Import BrowserAnimationsModule


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    TestComponent,
    TestDirective,
    TestPipe,
    HeaderComponent,
    RouterOutletComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
