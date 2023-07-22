import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterOutletRoutingModule } from './router-outlet-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterOutletRoutingModule
  ]
})
export class RouterOutletModule { }
