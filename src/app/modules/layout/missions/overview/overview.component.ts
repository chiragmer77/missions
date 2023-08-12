import { Component, Input } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent {
  @Input() dataFromParent: any;
  projectRoleLists: any = [];
  pagePayload: any = {
    IsHideCount: true,
    Search: '',
    IsDescending: true,
    Page: 1,
    PageSize: 10,
    OrderBy: ''
  }
  activityList: any = [];
  projectDocumentLists: any = [];
  projectObj: any;
  isConfirmationModalOpen: boolean = false;
  modalTitle: string = '';
  modalMessage: string = '';
  data: any;
  getDownloadFileUrl: any;

  constructor(
    private apiService: ApiService,
    public sharedService: SharedService,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService,
  ) {
    const storedData = localStorage.getItem('projectData');
    if (storedData) {
      this.projectObj = JSON.parse(storedData);
    }
  }


  ngOnInit(): void {
    this.getProjectRoleLists();
    this.getProjectActivity();
    this.getProjectDocuments();
  }

  handleChildComponentClose() {
    this.getProjectDocuments();
  }

  // Get Member List
  getProjectRoleLists() {
    this.apiService.getWithParams('ProjectRole',
      `ProjectId=${this.dataFromParent.id}`).subscribe((response) => {
        this.projectRoleLists = response.data;
      });
  }

  /** Get Project activtiy */
  getProjectActivity() {
    this.spinner.show();
    this.apiService.getWithParams('Activity',
      `ProjectId=${this.projectObj.id}&IsHideCount=${this.pagePayload.IsHideCount}&Search=${this.pagePayload.Search}&IsDescending=${this.pagePayload.IsDescending}&Page=${this.pagePayload.Page}&PageSize=${this.pagePayload.PageSize}`).subscribe((response) => {
        this.activityList = response.data;
        this.spinner.hide();
      });
  }

  /** Get Project activtiy */
  getProjectDocuments() {
    this.spinner.show();
    this.apiService.getWithParams('ProjectDocument',
      `ProjectId=${this.projectObj.id}&IsHideCount=${this.pagePayload.IsHideCount}&Search=${this.pagePayload.Search}&IsDescending=${this.pagePayload.IsDescending}&Page=${this.pagePayload.Page}&PageSize=${this.pagePayload.PageSize}`).subscribe((response) => {
        this.projectDocumentLists = response.data;
        this.spinner.hide();
      });
  }

  /** Get Dot class */
  getDotClass(status: string) {
    switch (status) {
      case 'Not-Started':
        return 'to-do-dot';
      case 'In-Progress':
        return 'in-progress-dot';
      case 'Complete':
        return 'complete-dot';
      case 'Block':
        return 'block-dot';
      default:
        return '';
    }
  }

  /** Update task status */
  updateProjectStatus(data: any, status: string) {
    this.spinner.show();
    let payload = {
      id: data.id,
      status: this.getPriorityValue(status)
    }
    this.apiService.put(`Project/${data.id}/status`, payload).subscribe((response) => {
      if (response.success) {
        this.toaster.success('Project status change Successfully!');
        data.status = this.getPriorityValue(status);
        this.spinner.hide();
      }
    });
  }

  /** Get Priority */
  private getPriorityValue(status: string): number {
    switch (status) {
      case 'Not-Started':
        return 1;
      case 'In-Progress':
        return 2;
      case 'Complete':
        return 3;
      case 'Block':
        return 4; // Change this value according to your requirements
      default:
        return 1;
    }
  }

  /** Remove Document */
  removeDocument(data: any) {
    this.modalTitle = 'Delete Documents';
    this.modalMessage = 'Are you sure you want to delete ' + data.name + ' from Documents?';
    this.data = data;
    this.isConfirmationModalOpen = !this.isConfirmationModalOpen;
  }

  // On Close Confirmation Modal
  onCloseConfirmationModal(event: any) {
    if (event) {
      this.spinner.show();
      this.apiService.delete(`ProjectDocument/${this.data.id}`).subscribe((response) => {
        if (response.success) {
          this.toaster.success('Documents Delete Successfully!');
          this.spinner.hide();
          this.getProjectDocuments();
        }
      });
    }
    this.isConfirmationModalOpen = !this.isConfirmationModalOpen;
  }

  /** View Documents */
  viewDocuments(data: any) {
    this.spinner.show();
    this.apiService.get(`ProjectDocument/download/${data.id}`).subscribe((response) => {
      if (response.success) {
        this.getDownloadFileUrl = decodeURIComponent(response.downloadUrl);
        window.open(this.getDownloadFileUrl, '_blank');
        this.spinner.hide();
      }
    });
  }
}
