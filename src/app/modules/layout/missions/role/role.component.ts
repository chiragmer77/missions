import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent {
  roleForm: FormGroup | any;
  designationList: any = [];
  memberList: any = [];
  isFormVisible: boolean = false; // Variable to track form visibility
  pagePayload: any = {
    IsHideCount: true,
    Search: '',
    IsDescending: true,
    Page: 1,
    PageSize: 10,
    OrderBy: ''
  }
  projectRoleList: any = [];
  projectObj: any;
  isEditing: boolean = false;

  isConfirmationModalOpen: boolean = false;
  modalTitle: string = '';
  modalMessage: string = '';
  data: any;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService,
    public sharedService: SharedService,
  ) { }

  ngOnInit() {
    const storedData = localStorage.getItem('projectData');
    if (storedData) {
      this.projectObj = JSON.parse(storedData);
    }
    this.roleForm = this.formBuilder.group({
      projectId: [this.projectObj.id],
      designation: [''],
      memberId: ['', Validators.required],
      hoursToSpend: ['', Validators.required],
      hourlyRate: ['', Validators.required],
    });
    this.getProjectRole();
    this.getListOfMemer();
    this.getListOfDesignation();
  }

  // Get Project Role
  getProjectRole() {
    this.spinner.show();
    this.apiService.getWithParams('ProjectRole',
      `ProjectId=${this.projectObj.id}&IsHideCount=${this.pagePayload.IsHideCount}&Search=${this.pagePayload.Search}&IsDescending=${this.pagePayload.IsDescending}&Page=${this.pagePayload.Page}&PageSize=${this.pagePayload.PageSize}`).subscribe((response) => {
        this.projectRoleList = response.data;
        this.spinner.hide();
      });
  }

  onSubmit() {
    this.roleForm.get('projectId').setValue(this.projectObj.id);
    // Trigger validation for all form controls
    this.markFormGroupAsTouched(this.roleForm);
    if (this.roleForm.valid) {
      this.spinner.show();
      var payload: any = this.roleForm.value;
      if (this.isEditing) {
        this.apiService.put(`ProjectRole/${payload.id}`, payload).subscribe((response) => {
          if (response.success) {
            this.toaster.success('Project Role Edit Successfully!');
            this.spinner.hide();
            this.hideForm();
            this.resetForm(); // Reset the form after successful add or update
          }
        });
      } else {
        this.spinner.show();
        this.apiService.post('ProjectRole', payload).subscribe((response) => {
          if (response.success) {
            this.toaster.success('Project Role Created Successfully!');
            this.spinner.hide();
            this.hideForm();
            this.getProjectRole();
            this.resetForm(); // Reset the form after successful add or update
          }
        });
      }
    }
  }

  // Function to reset the form when adding new data
  resetForm() {
    this.roleForm.reset();
    this.isEditing = false;
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

  onCancel() {
    this.hideForm();
    this.roleForm.reset();
  }

  showForm() {
    this.isFormVisible = true;
  }

  hideForm() {
    this.isFormVisible = false;
  }

  // Edit Role 
  editRole() {
    this.isFormVisible = true;
  }

  // Designation get 
  getListOfDesignation() {
    this.apiService.get('Designation/dropDown').subscribe((response) => {
      this.designationList = response.data;
    });
  }

  // Get Member List
  getListOfMemer() {
    this.apiService.get('Member/dropDown').subscribe((response) => {
      this.memberList = response.data;
    });
  }

  // Delete
  delete(data: any) {
    this.modalTitle = 'Delete Project Role';
    this.modalMessage = 'Are you sure you want to delete ' + data.member + ' from Project Role?';
    this.data = data;
    this.isConfirmationModalOpen = !this.isConfirmationModalOpen;
  }

  // On Close Confirmation Modal
  onCloseConfirmationModal(event: any) {
    if (event) {
      this.apiService.delete(`ProjectRole/${this.projectObj.id}/member/${this.data.memberId}`).subscribe((response) => {
        if (response.success) {
          this.toaster.success('Project Role Delete Successfully!');
          this.getProjectRole();
        }
      });
    }
    this.isConfirmationModalOpen = !this.isConfirmationModalOpen;
  }
}
