import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouterOutletComponent } from './router-outlet/router-outlet.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { DocumentComponent } from './documents/document/document.component';
import { ClientsComponent } from './clients/clients.component';
import { DesignationComponent } from './designation/designation.component';
import { CategoryComponent } from './category/category.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { GantChartComponent } from './gant-chart/gant-chart.component';
import { ProjectCategoryComponent } from './project-category/project-category.component';

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
      },
      {
        path: 'clients',
        component: ClientsComponent
      },
      {
        path: 'category',
        component: CategoryComponent
      },
      {
        path: 'designation',
        component: DesignationComponent
      },
      {
        path: 'analytics',
        component: AnalyticsComponent
      },
      {
        path: 'gant-chart',
        component: GantChartComponent
      },
      {
        path: 'project-category',
        component: ProjectCategoryComponent
      },
      {
        path: 'missions', loadChildren: () => import('./missions/missions-routing.module').then(m => m.MissionsRoutingModule),
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RouterOutletRoutingModule { }
