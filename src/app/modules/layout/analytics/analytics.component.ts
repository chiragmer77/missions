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
  hoursSpendByMembersList: any = [];
  missionStatsData: any = [];

  constructor(
    private apiService: ApiService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.hoursSpendByMembers();
    this.missionStats();
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

        const labels = this.hoursSpendByMembersList.map((member: any) => member.fullName); // Array of full names
        const dataHours = this.hoursSpendByMembersList.map((member: any) => member.totalHours); // Array of total hours

        // Sample data for the chart
        const data: any = {
          labels: labels,
          datasets: [{
            label: '# of Votes',
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
      From: '2022-07-26',
      To: '2023-08-08'
    };
    this.apiService.getWithParams('Dashboard/stats', `From=${params.From}&To=${params.To}`).subscribe((res: any) => {
      if (res.success === true) {
        this.missionStatsData = res.data;
      }
    });
  }


}
