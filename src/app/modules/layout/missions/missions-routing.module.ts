import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MissionsListComponent } from './missions-list/missions-list.component';
import { MissionDetailComponent } from './mission-detail/mission-detail.component';
import { RoleComponent } from './role/role.component';
import { DetailComponent } from './tasks/detail/detail.component';

const routes: Routes = [
  {
    path: '',
    component: MissionsListComponent,
  },
  {
    path: 'mission-detail',
    component: MissionDetailComponent,
  },
  {
    path: 'mission-roles',
    component: RoleComponent,
  },
  {
    path: 'mission-task-details',
    component: DetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MissionsRoutingModule { }
