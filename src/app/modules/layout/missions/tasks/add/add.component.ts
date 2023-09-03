import { Component, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  @Input() from: any;
  @Output() onClose: EventEmitter<any> = new EventEmitter<any>();
  myForm: FormGroup | any;
  isSidebarOpenClose: boolean = false;
  isEditing: boolean = false; // Flag to track whether it's an add or edit operation
  memberList: any = [];
  categoryList: any = [];
  projectObj: any;


  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private toaster: ToastrService,
    private renderer: Renderer2,
    private spinner: NgxSpinnerService,
    private sharedService: SharedService
  ) { }


  ngOnInit(): void {
    const storedData = localStorage.getItem('projectData');
    if (storedData) {
      this.projectObj = JSON.parse(storedData);
    }

    this.myForm = this.formBuilder.group({
      id: [null],
      projectId: [this.projectObj.id],
      memberId: ['', Validators.required],
      title: ['', Validators.required],
      projectTaskCategoryId: ['', Validators.required],
      expectedHours: ['', Validators.required],
      actualHours: ['', Validators.required],
      priority: ['', Validators.required],
      description: ['', Validators.required],
      endDate: ['', Validators.required],
      status: ['', Validators.required]
    });

    this.getListOfCategory();
    this.getListOfProjectRole();
  }

  // sidebar open close
  sidebarOpenClose() {
    this.isSidebarOpenClose = !this.isSidebarOpenClose;
    this.isSidebarOpenClose == true ? this.spinner.show('spinner1') : this.spinner.hide('spinner1');
    this.isSidebarOpenClose == true ? this.renderer.setStyle(document.body, 'overflow', 'hidden') : this.renderer.setStyle(document.body, 'overflow', 'auto')
    if (!this.isSidebarOpenClose) {
      this.isEditing = false;
    }
    if (!this.isEditing) {
      this.resetForm();
    }
  }

  onFormSubmit() {
    // Trigger validation for all form controls
    this.markFormGroupAsTouched(this.myForm);
    if (this.myForm!.valid) {
      this.spinner.show();
      var payload: any = this.myForm.value;
      payload.priority = parseInt(payload.priority, 10);
      payload.status = parseInt(payload.status, 10);
      if (this.isEditing) {
        this.apiService.put(`ProjectTask/${payload.id}`, payload).subscribe((response) => {
          if (response.success) {
            this.toaster.success('Project Task Edit Successfully!')
            // Emit the event when the child component is closed
            this.sharedService.taskAddEvent.emit(response);
            this.onClose.emit();
            this.spinner.hide();
            this.isSidebarOpenClose = !this.isSidebarOpenClose;
            this.isSidebarOpenClose == true ? this.renderer.setStyle(document.body, 'overflow', 'hidden') : this.renderer.setStyle(document.body, 'overflow', 'auto');
            this.resetForm(); // Reset the form after successful add or update
          }
        });
      } else {
        this.spinner.show();
        delete payload.id;
        this.apiService.post('ProjectTask', payload).subscribe((response) => {
          if (response.success) {
            this.toaster.success('Project Task Created Successfully!')
            // Emit the event when the child component is closed
            this.sharedService.taskAddEvent.emit(response);
            this.onClose.emit();
            this.spinner.hide();
            this.isSidebarOpenClose = !this.isSidebarOpenClose;
            this.isSidebarOpenClose == true ? this.renderer.setStyle(document.body, 'overflow', 'hidden') : this.renderer.setStyle(document.body, 'overflow', 'auto');
            this.resetForm(); // Reset the form after successful add or update
          }
        });
      }
    }
  }

  // Mark for check 
  private markFormGroupAsTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupAsTouched(control);
      }
    });
  }

  // Function to reset the form when adding new data
  resetForm() {
    this.myForm.reset();
    this.isEditing = false;
    this.myForm.reset({
      projectTaskCategoryId: '', // Set the designationId form control to an empty string
      priority: '',
      status: '',
      memberId: ''
    });
    this.myForm.get('projectId').setValue(this.projectObj.id)
  }

  handleEventInChild(data: any) {
    if (data.purpose === 'Add') {
      this.sidebarOpenClose();
    } else {
      this.sidebarOpenClose();
      data.data.endDate = new Date(data.data.endDate).toISOString().slice(0, 16);
      this.myForm.patchValue(data.data);
      this.isEditing = true;
    }

  }

  // Get Member lists
  getListOfProjectRole() {
    this.apiService.getWithParams('ProjectRole/dropDown/', `ProjectId=${this.projectObj.id}`).subscribe((response) => {
      this.memberList = response.data;
    });
  }

  // Get Member lists
  getListOfCategory() {
    this.apiService.get('ProjectTaskCategory/dropDown').subscribe((response) => {
      this.categoryList = response.data;
    });
  }

}
