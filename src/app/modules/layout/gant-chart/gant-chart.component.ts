import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GanttEditorComponent, GanttEditorOptions } from 'ng-gantt';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-gant-chart',
  templateUrl: './gant-chart.component.html',
  styleUrls: ['./gant-chart.component.css']
})
export class GantChartComponent {
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
  showDatepickerChart = false;
  fromDate: string = '';
  toDate: string = '';
  dateError: string = '';

  constructor(
    public fb: FormBuilder,
    private apiService: ApiService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    public sharedService: SharedService) {
  }

  ngOnInit() {
    this.setDefaultDateRange();
    this.getProjectTasksLists();
  }

  /** Set Defualt date range  */
  setDefaultDateRange() {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    this.fromDate = this.formatDate(firstDayOfMonth);
    this.toDate = this.formatDate(lastDayOfMonth);
  }

  /** Formate date */
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  /** Get Project tasks lists */
  getProjectTasksLists() {
    let params = {
      From: this.fromDate,
      To: this.toDate
    };
    this.spinner.show();
    this.apiService.getWithParams('Dashboard/gantt-chart', `From=${params.From}&To=${params.To}`).subscribe((response) => {
      this.projectTasksLists = response.data;
      this.projectTasksLists = this.projectTasksLists.map((item: any) => {
        const newItem: any = {};
        newItem['pID'] = item.project;
        newItem['pName'] = item.project;
        newItem['pStart'] = item.startDate;
        newItem['pEnd'] = item.endDate;
        newItem['pRes'] = ''
        newItem['pComp'] = ((item.completedTask / item.totalTask) * 100).toFixed(2);
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

  // Function to toggle datepicker visibility
  toggleDatepicker() {
    this.showDatepickerChart = !this.showDatepickerChart;
  }


  // Function to perform the search and trigger API call
  search() {
    if (this.fromDate && this.toDate) {
      const fromDateObj = new Date(this.fromDate);
      const toDateObj = new Date(this.toDate);

      if (fromDateObj <= toDateObj) {
        this.dateError = '';

      } else {
        this.dateError = 'From date cannot be greater than To date.';
      }
    } else {
      this.dateError = 'Please select both From and To dates.';
    }
  }
}


