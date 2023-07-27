import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MissionsRoutingModule } from './missions-routing.module';
import { MissionsListComponent } from './missions-list/missions-list.component';
import { AddMissionComponent } from './add-mission/add-mission.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { MissionDetailComponent } from './mission-detail/mission-detail.component';
import { OverviewComponent } from './overview/overview.component';
import { TasksComponent } from './tasks/tasks.component';
import { AddComponent } from './tasks/add/add.component';
import { BoardComponent } from './board/board.component';
import { TimelineComponent } from './timeline/timeline.component';
import { RoleComponent } from './role/role.component';


@NgModule({
  declarations: [
    MissionsListComponent,
    AddMissionComponent,
    MissionDetailComponent,
    OverviewComponent,
    TasksComponent,
    AddComponent,
    BoardComponent,
    TimelineComponent,
    RoleComponent
  ],
  exports: [],
  imports: [
    CommonModule,
    HttpClientModule,
    MissionsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MissionsModule { }
