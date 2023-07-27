import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MissionsListComponent } from './missions-list/missions-list.component';
import { MissionDetailComponent } from './mission-detail/mission-detail.component';

const routes: Routes = [
  {
    path: '',
    component: MissionsListComponent,
  },
  {
    path: 'mission-detail',
    component: MissionDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MissionsRoutingModule { }
