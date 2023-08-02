import { Component, EventEmitter, Output, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
declare var $: any;

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddDesignatinComponent {
  @Output() onClose: EventEmitter<any> = new EventEmitter<any>();
  myForm: FormGroup | any;
  isSidebarOpenClose: boolean = false;
  isEditing: boolean = false; // Flag to track whether it's an add or edit operation


  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private toaster: ToastrService,
    private renderer: Renderer2,
    private spinner: NgxSpinnerService,
  ) { }


  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      id: [null],
      name: ['', Validators.required],
    });
  }

  // sidebar open close
  sidebarOpenClose() {
    this.isSidebarOpenClose = !this.isSidebarOpenClose;
    this.isSidebarOpenClose == true ? this.renderer.setStyle(document.body, 'overflow', 'hidden') : this.renderer.setStyle(document.body, 'overflow', 'auto')
    this.resetForm(); // Reset the form after successful add or update
  }

  onFormSubmit() {
    // Trigger validation for all form controls
    this.markFormGroupAsTouched(this.myForm);

    if (this.myForm!.valid) {
      this.spinner.show();
      var payload: any = this.myForm.value;
      if (this.isEditing) {
        this.apiService.put(`Designation/${payload.id}`, payload).subscribe((response) => {
          if (response.success) {
            this.toaster.success('Designation Edit Successfully!');
            $('.sideFormFields').toggleClass('ShowFields');
            // Emit the event when the child component is closed
            this.onClose.emit();
            this.spinner.hide();
          }
        });
      } else {
        this.spinner.show();
        delete payload.id;
        this.apiService.post('Designation', payload).subscribe((response) => {
          if (response.success) {
            this.toaster.success('Designation Created Successfully!');
            $('.sideFormFields').toggleClass('ShowFields');
            // Emit the event when the child component is closed
            this.onClose.emit();
            this.spinner.hide();
          }
        });
      }
      this.resetForm(); // Reset the form after successful add or update

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

  handleEventInChild(data: any) {
    this.sidebarOpenClose();
    this.myForm.patchValue(data);
    this.isEditing = true;
  }

}

