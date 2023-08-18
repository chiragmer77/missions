import { Component, EventEmitter, OnInit, Output, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmedValidator } from 'src/app/modules/authentication/reset-password/confirmed';
import { ApiService } from 'src/app/services/api.service';
declare var $: any;
@Component({
  selector: 'app-create-member',
  templateUrl: './create-member.component.html',
  styleUrls: ['./create-member.component.css']
})
export class CreateMemberComponent implements OnInit {
  @Output() onClose: EventEmitter<any> = new EventEmitter<any>();
  myForm: FormGroup | any;
  isSidebarOpenClose: boolean = false;
  functionList: any = [];

  pagePayload: any = {
    IsHideCount: true,
    Search: '',
    IsDescending: true,
    Page: 1,
    PageSize: 10,
    OrderBy: ''
  }
  isEditing: boolean = false; // Flag to track whether it's an add or edit operation
  memberRole: any = [{ name: "Manager", id: "Manager" }, { name: "Associate", id: "Associate" }, { name: "Member", id: "Member" }];

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private renderer: Renderer2,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService) { }


  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      designationId: ['', Validators.required],
      hourlyRate: ['', Validators.required],
      role: ['', Validators.required],
      password: ['', [Validators.required, this.passwordStrengthValidator()]],
      ConfirmedPassword: ['', Validators.required]
    }, { validator: ConfirmedValidator('password', 'ConfirmedPassword') });

    this.getListOfDesignation();
  }

  // Password strength validator
  passwordStrengthValidator() {
    return Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$');
  }


  // sidebar open close
  sidebarOpenClose() {
    this.isSidebarOpenClose = !this.isSidebarOpenClose;
    this.isSidebarOpenClose == true ? this.spinner.show('spinner1') : this.spinner.hide('spinner1');
    this.isSidebarOpenClose == true ? this.renderer.setStyle(document.body, 'overflow', 'hidden') : this.renderer.setStyle(document.body, 'overflow', 'auto');
    this.myForm.reset();
    this.myForm.reset({
      designationId: '', // Set the designationId form control to an empty string
      role: ''
    });
  }

  // Submit Form
  onFormSubmit() {
    if (this.isEditing) {
      // Remove password and ConfirmedPassword validations for editing
      this.myForm.get('password').clearValidators();
      this.myForm.get('password').updateValueAndValidity();
      this.myForm.get('ConfirmedPassword').clearValidators();
      this.myForm.get('ConfirmedPassword').updateValueAndValidity();
    }
    // Trigger validation for all form controls
    this.markFormGroupAsTouched(this.myForm);
    if (this.myForm!.valid) {
      this.spinner.show();
      var payload: any = this.myForm.value;
      if (this.isEditing) {
        delete payload.confirmedPassword;
        delete payload.password;
        this.apiService.put(`Member/${payload.id}`, payload).subscribe((response) => {
          if (response.success) {
            this.toaster.success('Member Edit Successfully!')
            $('.sideFormFields').toggleClass('ShowFields');
            // Emit the event when the child component is closed
            this.onClose.emit();
            this.spinner.hide();
            this.resetForm(); // Reset the form after successful add or update

          }
        });
      } else {
        this.spinner.show();
        delete payload.id;
        this.apiService.post('Member', payload).subscribe((response) => {
          if (response.success) {
            this.toaster.success('Member Created Successfully!')
            $('.sideFormFields').toggleClass('ShowFields');
            // Emit the event when the child component is closed
            this.onClose.emit();
            this.spinner.hide();
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
    this.sidebarOpenClose();
  }

  // Designation get 
  getListOfDesignation() {
    this.apiService.get('Designation/dropDown').subscribe((response) => {
      this.functionList = response.data;
    });
  }

  handleEventInChild(data: any) {
    this.sidebarOpenClose();
    this.myForm.patchValue(data);
    this.isEditing = true;
  }

}
