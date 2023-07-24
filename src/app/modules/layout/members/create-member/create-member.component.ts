import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-create-member',
  templateUrl: './create-member.component.html',
  styleUrls: ['./create-member.component.css']
})
export class CreateMemberComponent implements OnInit {

  myForm: FormGroup | any;

  constructor(private formBuilder: FormBuilder) { }


  ngOnInit(): void {

    this.myForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      function: ['', Validators.required],
      hourlyRate: ['', Validators.required]
    });

    // Open
    $('#sideFormOpen').on('click', () => {
      this.myForm.reset();
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
