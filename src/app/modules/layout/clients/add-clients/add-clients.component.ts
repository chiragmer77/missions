import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
declare var $: any;


@Component({
  selector: 'app-add-clients',
  templateUrl: './add-clients.component.html',
  styleUrls: ['./add-clients.component.css']
})
export class AddClientsComponent {
  myForm: FormGroup | any;

  constructor(private formBuilder: FormBuilder) { }


  ngOnInit(): void {

    this.myForm = this.formBuilder.group({
      companyName: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      personContact: ['', Validators.required]
    });

    // Open
    $('#sideFormOpen').on('click', () => {
      $('.sideFormFields').toggleClass('ShowFields');
    });
    // close
    $('#sidebarClose').on('click', () => {
      $('.sideFormFields').toggleClass('ShowFields');
    });
    // Close button
    $('#sidebarCloseButton').on('click', () => {
      $('.sideFormFields').toggleClass('ShowFields');
    });
  }

  onFormSubmit() {
    if (this.myForm!.valid) {
      // Handle form submission here
      console.log(this.myForm!.value);
    }
  }

}
