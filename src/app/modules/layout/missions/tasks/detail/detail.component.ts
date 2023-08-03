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
      console.log(res)
      if (res.success) {
        this.toaster.success('Task Comment added successfully!');
        this.getTaskCommentList();
      }
    })

    // Optionally, you can clear the textarea after adding the comment
    const textareaElement = document.querySelector('.form-control') as HTMLTextAreaElement;
    textareaElement.value = '';
  }
}
