import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent {
  expenseForm: FormGroup | any;
  isFormVisible: boolean = false; // Variable to track form visibility
  pagePayload: any = {
    IsHideCount: true,
    Search: '',
    IsDescending: true,
    Page: 1,
    PageSize: 10,
    OrderBy: ''
  }
  projectExpanseList: any = [];
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
    public translate: TranslateService
  ) { }

  ngOnInit() {
    const storedData = localStorage.getItem('projectData');
    if (storedData) {
      this.projectObj = JSON.parse(storedData);
    }
    this.expenseForm = this.formBuilder.group({
      projectId: [this.projectObj.id],
      title: [''],
      description: ['', Validators.required],
      amount: ['', Validators.required],
    });
    this.getProjectExpense();
  }

  // Get Project Role
  getProjectExpense() {
    this.spinner.show();
    this.apiService.getWithParams('ProjectExpense',
      `ProjectId=${this.projectObj.id}&IsHideCount=${this.pagePayload.IsHideCount}&Search=${this.pagePayload.Search}&IsDescending=${this.pagePayload.IsDescending}&Page=${this.pagePayload.Page}&PageSize=${this.pagePayload.PageSize}`).subscribe((response) => {
        this.projectExpanseList = response.data;
        this.spinner.hide();
      });
  }

  onSubmit() {
    this.expenseForm.get('projectId').setValue(this.projectObj.id);
    // Trigger validation for all form controls
    this.markFormGroupAsTouched(this.expenseForm);
    if (this.expenseForm.valid) {
      this.spinner.show();
      var payload: any = this.expenseForm.value;
      if (this.isEditing) {
        this.apiService.put(`ProjectExpense/${payload.id}`, payload).subscribe((response) => {
          if (response.success) {
            this.toaster.success('Project Expense Edit Successfully!');
            this.spinner.hide();
            this.hideForm();
            this.resetForm(); // Reset the form after successful add or update
          }
        });
      } else {
        this.spinner.show();
        this.apiService.post('ProjectExpense', payload).subscribe((response) => {
          if (response.success) {
            this.toaster.success('Project Expense Created Successfully!');
            this.spinner.hide();
            this.hideForm();
            this.getProjectExpense();
            this.resetForm(); // Reset the form after successful add or update
          }
        });
      }
    }
  }

  // Function to reset the form when adding new data
  resetForm() {
    this.expenseForm.reset();
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
    this.expenseForm.reset();
  }

  showForm() {
    this.isFormVisible = true;
  }

  hideForm() {
    this.isFormVisible = false;
  }

  // Edit Role 
  editExpanse(data: any) {
    this.expenseForm.patchValue(data)
    this.isFormVisible = true;
  }

  // Delete
  delete(data: any) {
    this.modalTitle = 'Delete Project Expense';
    this.modalMessage = 'Are you sure you want to delete ' + data.title + ' from Project Expense?';
    this.data = data;
    this.isConfirmationModalOpen = !this.isConfirmationModalOpen;
  }

  // On Close Confirmation Modal
  onCloseConfirmationModal(event: any) {
    if (event) {
      this.apiService.delete(`ProjectExpense/${this.data.id}`).subscribe((response) => {
        if (response.success) {
          this.toaster.success('Project Expense Delete Successfully!');
          this.getProjectExpense();
        }
      });
    }
    this.isConfirmationModalOpen = !this.isConfirmationModalOpen;
  }
}
