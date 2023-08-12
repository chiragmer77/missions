import { Component, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  @ViewChild(EditProjectComponent) childComponent: EditProjectComponent | undefined;
  kpiData: any;
  hoursSpendByMembersList: any = [];
  hoursMonthList: any = [];
  chart: any;
  showDatepickerChart = false;
  showDatepickerMember = false;
  showDatepickerMission = false;
  fromDate: string = '';
  toDate: string = '';
  dateError: string = '';
  p: number = 1;
  pagePayload: any = {
    IsHideCount: true,
    Search: '',
    IsDescending: true,
    Page: 1,
    PageSize: 10,
    OrderBy: ''
  }
  missionList: any = [];
  modalTitle: string = '';
  modalMessage: string = '';
  data: any;
  isConfirmationModalOpen: boolean = false;


  constructor(
    private apiService: ApiService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    public translate: TranslateService,
  ) { }


  ngOnInit() {
    this.setDefaultDateRange();
    this.getKpiData();
    this.hoursSpendByMembers();
    this.hoursChart();
    this.getMissionList();
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


  // Function to toggle datepicker visibility
  toggleDatepicker(type: string) {
    if (type === 'hours-chart') {
      this.showDatepickerChart = !this.showDatepickerChart;
    } else if (type === 'hours-member') {
      this.showDatepickerMember = !this.showDatepickerMember;
    } else {
      this.showDatepickerMission = !this.showDatepickerMission;
    }
  }

  // Function to perform the search and trigger API call
  search(type: string) {
    if (this.fromDate && this.toDate) {
      const fromDateObj = new Date(this.fromDate);
      const toDateObj = new Date(this.toDate);

      if (fromDateObj <= toDateObj) {
        this.dateError = '';
        if (type === 'hours-chart') {
          this.hoursChart();
        } else if (type === 'hours-member') {
          this.hoursSpendByMembers();
        } else {
        }
      } else {
        this.dateError = 'From date cannot be greater than To date.';
      }
    } else {
      this.dateError = 'Please select both From and To dates.';
    }
  }

  /** Get KPI data */
  getKpiData() {
    this.spinner.show();
    this.apiService.get('Dashboard/kpi').subscribe((res: any) => {
      if (res.success === true) {
        this.kpiData = res;
        this.spinner.hide();
      }
    });
  }

  /** Hours Spent by Members */
  hoursSpendByMembers() {
    let params = {
      From: this.fromDate,
      To: this.toDate
    };
    this.apiService.getWithParams('Dashboard/hours-member', `From=${params.From}&To=${params.To}`).subscribe((res: any) => {
      if (res.success === true) {
        this.hoursSpendByMembersList = res.data;
      }
    });
  }

  /** Hours Chart */
  hoursChart() {
    let params = {
      From: this.fromDate,
      To: this.toDate
    };
    this.apiService.getWithParams('Dashboard/hours-month', `From=${params.From}&To=${params.To}`).subscribe((res: any) => {
      if (res.success === true) {
        this.hoursMonthList = res.data;
        const ctx: any = document.getElementById('linearChart');
        if (this.chart) {
          this.chart.destroy(); // Destroy the existing Chart instance
        }
        const data = this.hoursMonthList.map((entry: any) => entry.y);
        const labels = this.hoursMonthList.map((entry: any) => entry.x);
        var monthNames = [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
        this.chart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: labels.map((month: any) => monthNames[month - 1]),
            datasets: [{
              label: 'Hours Spent',
              data: data,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)', // Background color below the line
              fill: true // This fills the area below the line
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }
    });
  }

  // get mission list
  getMissionList() {
    this.spinner.show();
    this.apiService.getWithParams('Project',
      `IsHideCount=${this.pagePayload.IsHideCount}&Search=${this.pagePayload.Search}&IsDescending=${this.pagePayload.IsDescending}&Page=${this.pagePayload.Page}&PageSize=${this.pagePayload.PageSize}`).subscribe((response) => {
        this.missionList = response.data;
        this.missionList = this.missionList.slice(0, 5);
        this.spinner.hide();
      });
  }

  /** Delete Mission */
  deleteProject(data: any) {
    this.modalTitle = 'Delete Mission';
    this.modalMessage = 'Are you sure you want to delete ' + data.title + ' from Mission?';
    this.data = data;
    this.isConfirmationModalOpen = !this.isConfirmationModalOpen;
  }

  // On Close Confirmation Modal
  onCloseConfirmationModal(event: any) {
    if (event) {
      this.spinner.show();
      this.apiService.delete(`Project/${this.data.id}`).subscribe((response) => {
        if (response.success) {
          this.toaster.success('Mission Delete Successfully!');
          this.getMissionList();
          this.spinner.hide();
        }
      });
    }
    this.isConfirmationModalOpen = !this.isConfirmationModalOpen;
  }

  /** Edit Client details */
  editDetails(data: any) {
    this.childComponent!.handleEventInChild(data);
  }


  /** Child component close */
  handleChildComponentClose() {
    // This method will be called when the child component is closed
    this.getMissionList();
  }

}
