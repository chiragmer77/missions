import { Component } from '@angular/core';
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
    public sharedService: SharedService
  ) {
    const storedData = localStorage.getItem('projectData');
    if (storedData) {
      this.projectObj = JSON.parse(storedData);
    }
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

        console.log(this.todoList, this.inProgressList, this.completeList, this.blockedList);
        this.spinner.hide();
      });
  }

  // Remove Item 
  removeItemTasks(event: any, type: string) {
    console.log(event, type);
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
        this.getProjectTasksLists();
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
}