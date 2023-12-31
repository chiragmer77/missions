import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MissionsRoutingModule } from './missions-routing.module';
import { MissionsListComponent } from './missions-list/missions-list.component';
import { AddMissionComponent } from './add-mission/add-mission.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MissionDetailComponent } from './mission-detail/mission-detail.component';
import { OverviewComponent } from './overview/overview.component';
import { TasksComponent } from './tasks/tasks.component';
import { AddComponent } from './tasks/add/add.component';
import { BoardComponent } from './board/board.component';
import { TimelineComponent } from './timeline/timeline.component';
import { RoleComponent } from './role/role.component';
import { DetailComponent } from './tasks/detail/detail.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from 'src/app/shared/shared.module';
import { AttechmentsComponent } from './attechments/attechments.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { NgDragDropModule } from 'ng-drag-drop';
import { NgGanttEditorModule } from 'ng-gantt';
import { SharedService } from 'src/app/shared/services/shared.service';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { ExpenseComponent } from './expense/expense.component';
import { AddExpenseComponent } from './expense/add-expense/add-expense.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { IConfig, NgxMaskModule } from 'ngx-mask';
export const options: Partial<IConfig> | (() => Partial<IConfig>) | null = null;

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
    RoleComponent,
    DetailComponent,
    AttechmentsComponent,
    ExpenseComponent,
    AddExpenseComponent
  ],
  exports: [],
  imports: [
    CommonModule,
    HttpClientModule,
    MissionsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule,
    NgxPaginationModule,
    SharedModule,
    NgxFileDropModule,
    NgxSpinnerModule,
    NgDragDropModule.forRoot(),
    NgGanttEditorModule,
    NgxSkeletonLoaderModule,
    NgxMaskModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [SharedService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MissionsModule { }
