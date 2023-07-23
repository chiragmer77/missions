import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterOutletRoutingModule } from './router-outlet-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateMemberComponent } from './members/create-member/create-member.component';
import { MemberListComponent } from './members/member-list/member-list.component';


@NgModule({
  declarations: [
    DashboardComponent,
    CreateMemberComponent,
    MemberListComponent
  ],
  imports: [
    CommonModule,
    RouterOutletRoutingModule
  ]
})
export class RouterOutletModule { }
