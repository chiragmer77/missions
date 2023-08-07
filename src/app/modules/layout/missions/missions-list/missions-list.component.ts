import { Component, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { AddMissionComponent } from '../add-mission/add-mission.component';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs';

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
  isSearchVisible = false;


  constructor(
    private apiService: ApiService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    public sharedService: SharedService,
    private router: Router
  ) {
    this.sharedService.searchSubject.pipe(debounceTime(500)).subscribe((query) => {
      this.onSearch(query);
    });
  }


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

  /** Toggle search input */
  toggleSearchInput() {
    this.isSearchVisible = !this.isSearchVisible;
  }

  /** Close search input */
  closeSearchInput() {
    this.isSearchVisible = false;
  }

  /** search the client */
  onSearch(query: string) {
    this.getMissionList();
  }

  // Call this function when the input value changes
  updateSearchQuery() {
    this.sharedService.searchSubject.next(this.pagePayload.Search);
  }

}
