import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent {
  myChart: any;
  missionByFunctionChart: any;
  highNumberMissionsChart: any;
  highestPaidClientChart: any;
  hoursSpendByMembersList: any = [];
  missionStatsData: any = [];
  showDatepickerChart = false;
  showDatepickerMissionStats = false;
  fromDate: string = '';
  toDate: string = '';
  dateError: string = '';

  constructor(
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.setDefaultDateRange();
    this.hoursSpendByMembers();
    this.missionStats();
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

  // Function to perform the search and trigger API call
  search(type: string) {
    if (this.fromDate && this.toDate) {
      const fromDateObj = new Date(this.fromDate);
      const toDateObj = new Date(this.toDate);
      if (fromDateObj <= toDateObj) {
        this.dateError = '';
        if (type === 'hours-chart') {
          this.hoursSpendByMembers();
        } else {
          this.missionStats();
        }
      } else {
        this.dateError = 'From date cannot be greater than To date.';
      }
    } else {
      this.dateError = 'Please select both From and To dates.';
    }
  }



  // Function to toggle datepicker visibility
  toggleDatepicker(type: string) {
    if (type === 'hours-chart') {
      this.showDatepickerChart = !this.showDatepickerChart;
    } else {
      this.showDatepickerMissionStats = !this.showDatepickerMissionStats;
    }
  }

  /** Hours Spent by Members */
  hoursSpendByMembers() {
    this.spinner.show();
    let params = {
      From: this.fromDate,
      To: this.toDate
    };
    this.apiService.getWithParams('Dashboard/hours-member', `From=${params.From}&To=${params.To}`).subscribe((res: any) => {
      if (res.success === true) {
        this.hoursSpendByMembersList = res.data;
        this.spinner.hide();
        if (this.myChart) {
          this.myChart.destroy(); // Destroy the existing Chart instance
        }
        const labels = this.hoursSpendByMembersList.map((member: any) => member.fullName); // Array of full names
        const dataHours = this.hoursSpendByMembersList.map((member: any) => member.totalHours); // Array of total hours

        // Sample data for the chart
        const data: any = {
          labels: labels,
          datasets: [{
            label: '# Hours Spent',
            data: dataHours,
            borderWidth: 1
          }]
        };

        // Create and render the chart
        this.myChart = new Chart('myChart', {
          type: 'bar',
          data: data,
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

  /** Mission Stats */
  missionStats() {
    let params = {
      From: this.fromDate,
      To: this.toDate
    };
    this.apiService.getWithParams('Dashboard/stats', `From=${params.From}&To=${params.To}`).subscribe((res: any) => {
      if (res.success === true) {
        this.missionStatsData = res;
        this.createDoughnutCharts();
      }
    });
  }
  createDoughnutCharts() {
    // Generate an array of random background colors
    const generateRandomColors = (count: number) => {
      const colors: string[] = [];
      for (let i = 0; i < count; i++) {
        const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        colors.push(randomColor);
      }
      return colors;
    };

    // Function to destroy a Chart instance
    const destroyChart = (chart: Chart) => {
      if (chart) {
        chart.destroy();
      }
    };


    // Create Doughnut Chart for Mission by Function
    const missionByFunctionCtx = document.getElementById('missionByFunctionChart') as HTMLCanvasElement;
    const functionLabels = this.missionStatsData.projectByCategory.map((entry: any) => entry.x);
    const functionData = this.missionStatsData.projectByCategory.map((entry: any) => entry.y);
    const functionColors = generateRandomColors(functionLabels.length);
    destroyChart(this.missionByFunctionChart); // Destroy existing instance
    this.missionByFunctionChart = new Chart(missionByFunctionCtx, {
      type: 'doughnut',
      data: {
        labels: functionLabels,
        datasets: [{
          data: functionData,
          backgroundColor: functionColors
        }]
      }
    });

    // Create Doughnut Chart for High Number of Missions
    const highNumberMissionsCtx = document.getElementById('highNumberMissionsChart') as HTMLCanvasElement;
    var monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    const monthLabels = this.missionStatsData.projectByMonth.map((entry: any) => monthNames[entry.x - 1]);
    const monthData = this.missionStatsData.projectByMonth.map((entry: any) => entry.y);
    const monthColors = generateRandomColors(monthLabels.length);
    destroyChart(this.highNumberMissionsChart); // Destroy existing instance
    this.highNumberMissionsChart = new Chart(highNumberMissionsCtx, {
      type: 'doughnut',
      data: {
        labels: monthLabels,
        datasets: [{
          data: monthData,
          backgroundColor: monthColors
        }]
      }
    });

    // Create Doughnut Chart for Highest Paid Client
    const highestPaidClientCtx = document.getElementById('highestPaidClientChart') as HTMLCanvasElement;
    const clientLabels = this.missionStatsData.projectByClient.map((entry: any) => entry.x);
    const clientData = this.missionStatsData.projectByClient.map((entry: any) => entry.y);
    const clientColors = generateRandomColors(clientLabels.length);
    destroyChart(this.highestPaidClientChart); // Destroy existing instance
    this.highestPaidClientChart = new Chart(highestPaidClientCtx, {
      type: 'doughnut',
      data: {
        labels: clientLabels,
        datasets: [{
          data: clientData,
          backgroundColor: clientColors
        }]
      }
    });
  }

}