import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { AddComponent } from './add/add.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  isConfirmationModalOpen: boolean = false;
  modalTitle: string = '';
  modalMessage: string = '';
  data: any;
  pagePayload: any = {
    IsHideCount: true,
    Search: '',
    IsDescending: true,
    Page: 1,
    PageSize: 10,
    OrderBy: ''
  }
  projectObj: any;
  projectTasksLists: any = [];
  p: number = 1

  constructor(
    private apiService: ApiService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    public sharedService: SharedService,
    private router: Router,
    public translate: TranslateService,
  ) {
    const storedData = localStorage.getItem('projectData');
    if (storedData) {
      this.projectObj = JSON.parse(storedData);
    }

    this.sharedService.taskAddEvent.subscribe((priority: any) => {
      // Do something when priority changes
      if (priority.success) {
        this.getProjectTasksLists();
      }
    });
  }

  ngOnInit(): void {
    this.getProjectTasksLists();
  }

  /** Get Project tasks lists */
  getProjectTasksLists() {
    this.spinner.show();
    this.apiService.getWithParams('ProjectTask',
      `ProjectId=${this.projectObj.id}&IsHideCount=${this.pagePayload.IsHideCount}&Search=${this.pagePayload.Search}&IsDescending=${this.pagePayload.IsDescending}&Page=${this.pagePayload.Page}&PageSize=${this.pagePayload.PageSize}`).subscribe((response) => {
        this.projectTasksLists = response.data;
        this.spinner.hide();
      });
  }

  /** Get Dot class */
  getDotClass(status: string) {
    switch (status) {
      case 'To-Do':
        return 'to-do-dot';
      case 'In-Progress':
        return 'in-progress-dot';
      case 'Complete':
        return 'complete-dot';
      case 'Block':
        return 'block-dot';
      default:
        return '';
    }
  }

  /** Update task status */
  updateTaskProgress(task: any, status: string) {
    this.spinner.show();
    let payload = {
      id: task.id,
      status: this.getPriorityValue(status)
    }
    this.apiService.put(`ProjectTask/${task.id}/status`, payload).subscribe((response) => {
      if (response.success) {
        this.toaster.success('Project task change Successfully!');
        task.status = this.getPriorityValue(status);
        this.spinner.hide();
      }
    });
  }

  /** Get Priority */
  private getPriorityValue(status: string): number {
    switch (status) {
      case 'To-Do':
        return 1;
      case 'In-Progress':
        return 2;
      case 'Complete':
        return 3;
      case 'Block':
        return 4; // Change this value according to your requirements
      default:
        return 1;
    }
  }

  /** Set Task Data */
  setTaskData(data: any) {
    localStorage.setItem('taskData', JSON.stringify(data));
    this.router.navigate(['/dashboard/missions/mission-task-details/']);
    console.log(data);
  }

  /** Delete Mission */
  deleteTask(data: any) {
    this.modalTitle = 'Delete Task';
    this.modalMessage = 'Are you sure you want to delete ' + data.title + ' from Tasks?';
    this.data = data;
    this.isConfirmationModalOpen = !this.isConfirmationModalOpen;
  }


  // On Close Confirmation Modal
  onCloseConfirmationModal(event: any) {
    if (event) {
      this.spinner.show();
      this.apiService.delete(`ProjectTask/${this.data.id}`).subscribe((response) => {
        if (response.success) {
          this.toaster.success('Task Delete Successfully!');
          this.getProjectTasksLists();
          this.spinner.hide();
        }
      });
    }
    this.isConfirmationModalOpen = !this.isConfirmationModalOpen;
  }

  /** Edit Client details */
  editDetails(data: any) {
    let payload: any = {
      data: data,
      purpose: 'Edit'
    }
    this.sharedService.taskAddSideWindowEvent.emit(payload);
  }

}
