import { Component, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { AddMissionComponent } from '../add-mission/add-mission.component';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-missions-list',
  templateUrl: './missions-list.component.html',
  styleUrls: ['./missions-list.component.css']
})
export class MissionsListComponent {

  // Mission List API
  @ViewChild(AddMissionComponent) childComponent: AddMissionComponent | undefined;
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
  missionList: any = [];
  p: number = 1;


  constructor(
    private apiService: ApiService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private sharedService: SharedService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.getMissionList();
  }


  // get mission list
  getMissionList() {
    this.spinner.show();
    this.apiService.getWithParams('Project',
      `IsHideCount=${this.pagePayload.IsHideCount}&Search=${this.pagePayload.Search}&IsDescending=${this.pagePayload.IsDescending}&Page=${this.pagePayload.Page}&PageSize=${this.pagePayload.PageSize}`).subscribe((response) => {
        this.missionList = response.data;
        this.spinner.hide();
      });
  }

  /** Child component close */
  handleChildComponentClose() {
    // This method will be called when the child component is closed
    this.getMissionList();
  }

  /** Set Project Data */
  setProjectData(data: any) {
    localStorage.setItem('projectData', JSON.stringify(data));
    this.router.navigate(['/dashboard/missions/mission-detail/']);
    localStorage.setItem('previousTab', 'Overview-tab');
    console.log(data);
  }

}
