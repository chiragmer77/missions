import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  @Output() openAddTask: EventEmitter<void> = new EventEmitter<void>();

  projectTasksLists: any = [];
  pagePayload: any = {
    IsHideCount: true,
    Search: '',
    IsDescending: true,
    Page: 1,
    PageSize: 10,
    OrderBy: ''
  }
  projectObj: any;
  todoList: any = [];
  inProgressList: any = [];
  completeList: any = [];
  blockedList: any = [];

  constructor(
    private apiService: ApiService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    public sharedService: SharedService,
    private router: Router
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
        // Filter tasks based on status
        this.todoList = this.projectTasksLists.filter((task: any) => task.status === 1);
        this.inProgressList = this.projectTasksLists.filter((task: any) => task.status === 2);
        this.completeList = this.projectTasksLists.filter((task: any) => task.status === 3);
        this.blockedList = this.projectTasksLists.filter((task: any) => task.status === 4);
        this.spinner.hide();
      });
  }

  // Remove Item 
  removeItemTasks(event: any, type: string) {
    this.updateTaskProgress(event.dragData, type);
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
        task.status = payload.status;
        // Filter tasks based on status
        this.todoList = this.projectTasksLists.filter((task: any) => task.status === 1);
        this.inProgressList = this.projectTasksLists.filter((task: any) => task.status === 2);
        this.completeList = this.projectTasksLists.filter((task: any) => task.status === 3);
        this.blockedList = this.projectTasksLists.filter((task: any) => task.status === 4);
        // this.getProjectTasksLists();
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

  /** Add Tasks Event */
  addTasks() {
    let payload: any = {
      data: null,
      purpose: 'Add'
    }
    this.sharedService.taskAddSideWindowEvent.emit(payload);
  }

  /** Set Task Data */
  setTaskData(data: any) {
    localStorage.setItem('taskData', JSON.stringify(data));
    this.router.navigate(['/dashboard/missions/mission-task-details/']);
  }
}