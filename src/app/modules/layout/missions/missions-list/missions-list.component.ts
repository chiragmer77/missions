import { Component, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { AddMissionComponent } from '../add-mission/add-mission.component';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-missions-list',
  templateUrl: './missions-list.component.html',
  styleUrls: ['./missions-list.component.css']
})
export class MissionsListComponent {

  // Mission List API
  @ViewChild(AddMissionComponent) childComponent: AddMissionComponent | undefined;
  isConfirmationModalOpen: boolean = false;
  isFilterModal: boolean = false;
  modalTitle: string = '';
  modalMessage: string = '';
  data: any;
  pagePayload: any = {
    MemberId: '',
    ClientId: '',
    Status: '',
    IsHideCount: true,
    Search: '',
    IsDescending: true,
    Page: 1,
    PageSize: 5,
    OrderBy: ''
  }
  missionList: any = [];
  missionListStored: any = [];
  p: number = 1;
  pe: number = 1;
  isSearchVisible = false;
  projectTaskExpenseList: any = [];
  skeletons: boolean = true;
  projectToalCount: any;
  filterField: any = {
    status: '',
    clientName: '',
    member: ''
  };
  constructor(
    private apiService: ApiService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    public sharedService: SharedService,
    private router: Router,
    public translate: TranslateService,
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
    if (this.sharedService.clientMissionList) {
      this.pagePayload.ClientId = this.sharedService.clientMissionList.id;
      this.filterField.clientName = this.sharedService.clientMissionList;
    }
    this.skeletons = true;
    this.apiService.getWithParams('Project',
      `IsHideCount=${this.pagePayload.IsHideCount}&Search=${this.pagePayload.Search}&IsDescending=${this.pagePayload.IsDescending}&Page=${this.pagePayload.Page}&PageSize=${this.pagePayload.PageSize}&ClientId=${this.pagePayload.ClientId}&Status=${this.pagePayload.Status}&MemberId=${this.pagePayload.MemberId}`).subscribe((response) => {
        this.missionList = response.data;
        this.missionListStored = response.data;
        this.projectToalCount = response.count;

        this.skeletons = false;
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

  /** Open filter modal */
  openFilterModal() {
    this.isFilterModal = !this.isFilterModal;
  }

  //** On Close Filter Event */
  onCloseFilterEvent(event: any) {
    this.filterField = event;
    if (event.action) {
      if (event.clientName) {
        this.pagePayload.ClientId = event.clientName.id;
      }
      if (event.status) {
        this.pagePayload.Status = event.status;
      }
      if (event.member) {
        this.pagePayload.MemberId = event.member.id;
      }
      this.getMissionList();
    } else {
      // Update the mission list with the filtered results
      this.pagePayload.ClientId = '';
      this.pagePayload.Status = '';
      this.pagePayload.MemberId = '';
      this.getMissionList();
    }
    this.isFilterModal = false;
  }

  /** Clear filter */
  clearAllAppliedFields(filterField: any) {
    let filterType: any = {
      type: ''
    }
    if (filterField == this.filterField?.clientName) {
      this.filterField.clientName = null;
      this.sharedService.clientMissionList = null;
      this.pagePayload.ClientId = '';
      this.getMissionList();
      filterType.type = 'Client';
      this.sharedService.triggerPopoverClick(filterType);
    }
    if (filterField == this.filterField?.member) {
      this.filterField.member = null;
      this.pagePayload.MemberId = '';
      this.getMissionList();
      filterType.type = 'Member';
      this.sharedService.triggerPopoverClick(filterType);
    }
    if (filterField == this.filterField?.status) {
      this.filterField.status = null;
      this.pagePayload.Status = '';
      this.getMissionList();
      filterType.type = 'Status';
      this.sharedService.triggerPopoverClick(filterType);
    }
    if (filterField == this.filterField) {
      this.pagePayload.ClientId = '';
      this.pagePayload.Status = '';
      this.pagePayload.MemberId = '';
      this.sharedService.clientMissionList = null;
      this.filterField = null;
      filterType.type = 'All';
      this.getMissionList();
      this.sharedService.triggerPopoverClick(filterType);
    }
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
    if (this.pagePayload.Search) {
      this.pagePayload.Search = '';
      this.updateSearchQuery();
    }
  }

  /** search the client */
  onSearch(query: string) {
    this.getMissionList();
  }

  // Call this function when the input value changes
  updateSearchQuery() {
    this.missionList = [];
    this.skeletons = true;
    this.sharedService.searchSubject.next(this.pagePayload.Search);
  }

  /** Vew Project expnase */
  viewProjectExpense(data: any) {
    this.skeletons = true;
    this.projectTaskExpenseList = [];
    this.apiService.get(`ProjectTask/expense/${data.id}`).subscribe((res: any) => {
      if (res.success) {
        this.skeletons = false;
        this.projectTaskExpenseList = res.data;
      }
    });
  }

  /** Page change event */
  getPage(event: any) {
    this.missionList = [];
    this.skeletons = true;
    this.p = event;
    this.pagePayload.Page = event;
    this.getMissionList();
  }

}
