import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MissionsRoutingModule } from './missions-routing.module';
import { MissionsListComponent } from './missions-list/missions-list.component';


@NgModule({
  declarations: [
    MissionsListComponent
  ],
  imports: [
    CommonModule,
    MissionsRoutingModule
  ]
})
export class MissionsModule { }
