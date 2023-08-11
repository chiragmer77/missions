import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GanttEditorComponent, GanttEditorOptions } from 'ng-gantt';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent {
  @ViewChild('editor') editor: GanttEditorComponent | any;
  public editorOptions: GanttEditorOptions | any;
  public data: any;
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
    public fb: FormBuilder,
    private apiService: ApiService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    public sharedService: SharedService) {
    const storedData = localStorage.getItem('projectData');
    if (storedData) {
      this.projectObj = JSON.parse(storedData);
    }
  }

  ngOnInit() {
    this.getProjectTasksLists();
  }

  /** Get Project tasks lists */
  getProjectTasksLists() {
    this.spinner.show();
    this.apiService.getWithParams(`ProjectTask/${this.projectObj.id}/timeline`,
      `id=${this.projectObj.id}`).subscribe((response) => {
        this.projectTasksLists = response.data;
        this.projectTasksLists = this.projectTasksLists.map((item: any) => {
          const newItem: any = {};
          newItem['pID'] = item.createdDate;
          newItem['pName'] = item.title;
          newItem['pStart'] = item.createdDate;
          newItem['pEnd'] = item.endDate;
          newItem['pRes'] = item.member;
          newItem['pClass'] = this.getRandomColor();
          // You can update other properties as needed, if available in the arrayData
          return newItem;
        });
        this.editorOptions = {
          vFormat: "day",
          vEditable: true,
        };
        // Filter tasks based on status
        this.spinner.hide();
      });
  }



  // Function to get a random color from the colors array
  getRandomColor() {
    // Array of available colors
    const colors = [
      'ggroupblack',
      'gtaskblue',
      'gtaskred',
      'gtaskgreen',
      'gtaskyellow',
      'gtaskpurple',
      'gtaskpink'
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }


}

