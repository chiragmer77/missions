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
  statuses: string[] = ['To-do', 'In-progress', 'Complete', 'Block'];

  items = [
    { name: "Apple", type: "fruit" },
    { name: "Carrot", type: "vegetable" },
    { name: "Orange", type: "fruit" }
  ];

  droppedItems = [
    { name: "Tomato", type: "vegetable" }
  ];
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
        this.spinner.hide();
      });
  }

  addItem(e: any) {
    // add to droppedItems list
    this.droppedItems.push(e.dragData);
    console.log(e.dragData);

    // remove from original list
    const index = this.items.indexOf(e.dragData);
    console.log("addItem index", index);
    if (index > -1) {
      this.items.splice(index, 1);
    }
  }

  removeItem(e: any) {
    // add to original list
    this.items.push(e.dragData);

    // remove from droppedItems list
    const index = this.droppedItems.indexOf(e.dragData);
    console.log("removeItem index", index);
    if (index > -1) {
      this.droppedItems.splice(index, 1);
    }
  }
}