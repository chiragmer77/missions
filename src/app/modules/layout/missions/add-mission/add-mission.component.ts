import { Component, EventEmitter, Output, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-mission',
  templateUrl: './add-mission.component.html',
  styleUrls: ['./add-mission.component.css']
})
export class AddMissionComponent {
  @Output() onClose: EventEmitter<any> = new EventEmitter<any>();
  myForm: FormGroup | any;
  isSidebarOpenClose: boolean = false;
  isEditing: boolean = false; // Flag to track whether it's an add or edit operation
  clientList: any = [];
  memberList: any = [];
  date: any;
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private toaster: ToastrService,
    private renderer: Renderer2,
    private spinner: NgxSpinnerService,
  ) {
  }


  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      id: [null],
      title: ['', Validators.required],
      description: ['', Validators.required],
      clientId: ['', Validators.required],
      teamLeadId: ['', Validators.required],
      status: ['', Validators.required],
      budget: ['', Validators.required],
      startDate: [new Date().toISOString().slice(0, 16), Validators.required],
      endDate: ['', Validators.required]
    });
    this.getClientList();
    this.getMemberList();
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  // sidebar open close
  sidebarOpenClose() {
    this.isSidebarOpenClose = !this.isSidebarOpenClose;
    this.isSidebarOpenClose == true ? this.renderer.setStyle(document.body, 'overflow', 'hidden') : this.renderer.setStyle(document.body, 'overflow', 'auto');
    this.isSidebarOpenClose == true ? this.renderer.setStyle(document.body, 'background-color', 'rgba(0, 0, 0, 0.5)') : this.renderer.setStyle(document.body, 'background-color', 'auto');
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
      this.myForm!.value.budget = this.myForm!.value.budget.toString();
      var payload: any = this.myForm.value;
      payload.status = parseInt(payload.status, 10);
      if (this.isEditing) {
        this.apiService.put(`Project/${payload.id}`, payload).subscribe((response) => {
          if (response.success) {
            this.toaster.success('Mission Edit Successfully!')
            // Emit the event when the child component is closed
            this.onClose.emit();
            this.spinner.hide();
            this.isSidebarOpenClose = !this.isSidebarOpenClose;
            this.isSidebarOpenClose == true ? this.renderer.setStyle(document.body, 'overflow', 'hidden') : this.renderer.setStyle(document.body, 'overflow', 'auto');
            this.resetForm(); // Reset the form after successful add or update

          }
        });
      } else {
        console.log(payload);
        delete payload.id;
        this.apiService.post('Project', payload).subscribe((response) => {
          if (response.success) {
            this.toaster.success('Mission Created Successfully!')
            // Emit the event when the child component is closed
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
      clientId: '', // Set the designationId form control to an empty string
      teamLeadId: '',
      status: ''
    });
  }

  /** Handel child event */
  handleEventInChild(data: any) {
    this.isEditing = true;
    this.sidebarOpenClose();
    data.startDate = new Date(data.startDate).toISOString().slice(0, 16);
    data.endDate = new Date(data.endDate).toISOString().slice(0, 16);
    this.myForm.patchValue(data);
  }

  // Get Client list
  getClientList() {
    this.apiService.get('AppClient/dropDown').subscribe((response) => {
      this.clientList = response.data;
    });
  }

  // Get Member List
  getMemberList() {
    this.apiService.get('Member/dropDown').subscribe((response) => {
      this.memberList = response.data;
    });
  }

}
