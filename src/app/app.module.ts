import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/authentication/login/login.component';
import { ForgotPasswordComponent } from './modules/authentication/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './modules/authentication/reset-password/reset-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './modules/layout/header/header.component';
import { RouterOutletComponent } from './modules/layout/router-outlet/router-outlet.component'; // Import BrowserAnimationsModule
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { ApiInterceptor } from './core/interceptor/api.interceptor';
import { MissionsModule } from './modules/layout/missions/missions.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { DatePipe } from '@angular/common';
import { NgDragDropModule } from 'ng-drag-drop';
import { NgGanttEditorModule } from 'ng-gantt'
import { TooltipModule } from 'ng2-tooltip-directive';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { RouterOutletModule } from './modules/layout/router-outlet.module';
import { SharedService } from './shared/services/shared.service';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { JwtModule } from "@auth0/angular-jwt";
import { IConfig, NgxMaskModule } from 'ngx-mask';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
export const options: Partial<IConfig> | (() => Partial<IConfig>) | null = null;
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    HeaderComponent,
    RouterOutletComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MissionsModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    NgDragDropModule.forRoot(),
    NgGanttEditorModule,
    TooltipModule,
    RouterOutletModule,
    NgxSkeletonLoaderModule,
    NgxMaskModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('access_token')
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    },
    DatePipe,
    SharedService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
