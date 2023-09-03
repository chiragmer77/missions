import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/shared/services/shared.service';

interface Comment {
  id: number;
  profilePhoto: string;
  userName: string;
  time: string;
  commentDescription: string;
}

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {
  commentText: string = '';
  taskData: any;
  projectObj: any;
  pagePayload: any = {
    IsHideCount: true,
    Search: '',
    IsDescending: true,
    Page: 1,
    PageSize: 10,
    OrderBy: ''
  }
  projectTaskCommentLists: any = [];
  projectTaskDocumentLists: any = [];
  isConfirmationModalOpen: boolean = false;
  modalTitle: string = '';
  modalMessage: string = '';
  data: any;
  getDownloadFileUrl: any;


  constructor(
    public sharedService: SharedService,
    private apiService: ApiService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService) { }



  ngOnInit(): void {
    const storedData = localStorage.getItem('taskData');
    if (storedData) {
      this.taskData = JSON.parse(storedData);
    }
    const storedProjectData = localStorage.getItem('projectData');
    if (storedProjectData) {
      this.projectObj = JSON.parse(storedProjectData);
    }

    this.getTaskCommentList();
    this.getProjectTasksDocuments();
  }

  /** Get Task Comment list */
  getTaskCommentList() {
    this.spinner.show();
    this.apiService.getWithParams('ProjectTaskComment',
      `ProjectTaskId=${this.taskData.id}&IsHideCount=${this.pagePayload.IsHideCount}&Search=${this.pagePayload.Search}&IsDescending=${this.pagePayload.IsDescending}&Page=${this.pagePayload.Page}&PageSize=${this.pagePayload.PageSize}`).subscribe((response) => {
        this.projectTaskCommentLists = response.data;
        this.spinner.hide();
      });
  }

  /** On press enter  */
  onEnterPressed(event: any) {
    const comment = event.target.value;

    // Perform validation
    if (!comment.trim()) {
      this.toaster.warning('Comment cannot be empty!')
      return;
    }

    const payload: any = {
      projectTaskId: this.taskData.id,
      comment: comment
    }
    // Call your API function here
    this.apiService.post('ProjectTaskComment', payload).subscribe((res: any) => {
      if (res.success) {
        this.toaster.success('Task Comment added successfully!');
        this.getTaskCommentList();
      }
    })

    // Optionally, you can clear the textarea after adding the comment
    const textareaElement = document.querySelector('.form-control') as HTMLTextAreaElement;
    textareaElement.value = '';
  }

  /** Get Project Documents */
  getProjectTasksDocuments() {
    this.spinner.show();
    this.apiService.getWithParams('ProjectDocument',
      `ProjectId=${this.projectObj.id}&taskData=${this.taskData.id}&IsHideCount=${this.pagePayload.IsHideCount}&Search=${this.pagePayload.Search}&IsDescending=${this.pagePayload.IsDescending}&Page=${this.pagePayload.Page}&PageSize=${this.pagePayload.PageSize}`).subscribe((response) => {
        this.projectTaskDocumentLists = response.data;
        this.spinner.hide();
      });
  }


  /** Get Dot class */
  getDotClass(status: string) {
    switch (status) {
      case 'To-Do':
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
  updateTaskProgress(task: any, status: string) {
    this.spinner.show();
    let payload = {
      id: task.id,
      status: this.getPriorityValue(status)
    }
    this.apiService.put(`ProjectTask/${task.id}/status`, payload).subscribe((response) => {
      if (response.success) {
        this.toaster.success('Project task change Successfully!');
        task.status = this.getPriorityValue(status);
        this.spinner.hide();
      }
    });
  }

  /** Get Priority */
  private getPriorityValue(status: string): number {
    switch (status) {
      case 'To-Do':
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

  handleChildComponentClose() {
    this.getProjectTasksDocuments();
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
          this.getProjectTasksDocuments();
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
