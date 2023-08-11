import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutletRoutingModule } from './router-outlet-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateMemberComponent } from './members/create-member/create-member.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { DocumentComponent } from './documents/document/document.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from 'src/app/services/api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientsComponent } from './clients/clients.component';
import { AddClientsComponent } from './clients/add-clients/add-clients.component';
import { DocumentDetailsComponent } from './documents/document-details/document-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DesignationComponent } from './designation/designation.component';
import { CategoryComponent } from './category/category.component';
import { AddDesignatinComponent } from './designation/add/add.component';
import { AddCategoryComponent } from './category/add/add.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AnalyticsComponent } from './analytics/analytics.component';
import { GantChartComponent } from './gant-chart/gant-chart.component';
import { NgGanttEditorModule } from 'ng-gantt';
import { ProjectCategoryComponent } from './project-category/project-category.component';
import { AddProjectCategoryComponent } from './project-category/add/add.component';
import { SharedService } from 'src/app/shared/services/shared.service';
import { MissionsModule } from './missions/missions.module';
import { EditProjectComponent } from './dashboard/edit-project/edit-project.component';


@NgModule({
  declarations: [
    DashboardComponent,
    CreateMemberComponent,
    MemberListComponent,
    DocumentComponent,
    ClientsComponent,
    AddClientsComponent,
    DocumentDetailsComponent,
    DesignationComponent,
    CategoryComponent,
    AddDesignatinComponent,
    AddCategoryComponent,
    AnalyticsComponent,
    GantChartComponent,
    ProjectCategoryComponent,
    AddProjectCategoryComponent,
    EditProjectComponent],
  imports: [
    CommonModule,
    RouterOutletRoutingModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgGanttEditorModule,
    MissionsModule
  ], schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    ApiService,
    SharedService
  ]
})
export class RouterOutletModule { }
