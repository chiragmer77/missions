import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouterOutletComponent } from './router-outlet/router-outlet.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { DocumentComponent } from './documents/document/document.component';

const routes: Routes = [
  {
    path: '',
    component: RouterOutletComponent,
    children: [
      {
        path: '', redirectTo: 'dashboard', pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'member-list',
        component: MemberListComponent
      },
      {
        path: 'document',
        component: DocumentComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RouterOutletRoutingModule { }
