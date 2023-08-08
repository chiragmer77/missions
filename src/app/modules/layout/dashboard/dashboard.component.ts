import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  kpiData: any;
  hoursSpendByMembersList: any = [];
  hoursMonthList: any = [];
  chart: any;

  constructor(
    private apiService: ApiService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private sharedService: SharedService
  ) { }


  ngOnInit() {
    this.getKpiData();
    this.hoursSpendByMembers();
    this.hoursChart();
    this.createChart();
  }

  /** Get KPI data */
  getKpiData() {
    this.apiService.get('Dashboard/kpi').subscribe((res: any) => {
      if (res.success === true) {
        this.kpiData = res;
      }
    });
  }

  /** Hours Spent by Members */
  hoursSpendByMembers() {
    let params = {
      From: '2023-07-26',
      To: '2023-08-08'
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
      From: '2023-07-26',
      To: '2023-08-08'
    };
    this.apiService.getWithParams('Dashboard/hours-month', `From=${params.From}&To=${params.To}`).subscribe((res: any) => {
      if (res.success === true) {
        this.hoursMonthList = res.data;
      }
    });
  }

  createChart() {
    const ctx: any = document.getElementById('linearChart');
    const monthlyData = [
      { month: 'Jan', hours: 10 },
      { month: 'Feb', hours: 20 },
      { month: 'Mar', hours: 30 },
      { month: 'Apr', hours: 40 },
      { month: 'May', hours: 50 },
      { month: 'Jun', hours: 60 },
      { month: 'Jul', hours: 70 },
      { month: 'Aug', hours: 80 },
      { month: 'Sep', hours: 90 },
      { month: 'Oct', hours: 100 },
      { month: 'Nov', hours: 110 },
      { month: 'Dec', hours: 120 },
      // ...and so on for other months
    ];

    const data = monthlyData.map(entry => entry.hours);
    const labels = monthlyData.map(entry => entry.month);

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
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
}
