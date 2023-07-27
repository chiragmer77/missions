import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-create-member',
  templateUrl: './create-member.component.html',
  styleUrls: ['./create-member.component.css']
})
export class CreateMemberComponent implements OnInit {

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

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private renderer: Renderer2) { }


  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      designationId: ['', Validators.required],
      hourlyRate: ['', Validators.required],
      "password": "Lahore123@",
      "confirmedPassword": "Lahore123@"
    });

    this.getListOfDesignation();
  }

  // sidebar open close
  sidebarOpenClose() {
    this.isSidebarOpenClose = !this.isSidebarOpenClose;
    this.isSidebarOpenClose == true ? this.renderer.setStyle(document.body, 'overflow', 'hidden') : this.renderer.setStyle(document.body, 'overflow', 'auto');

  }

  // Submit Form
  onFormSubmit() {
    if (this.myForm!.valid) {
      // Handle form submission here
      console.log(this.myForm!.value);
      this.apiService.post('Member', this.myForm!.value).subscribe((response) => {

      });
    }
  }

  // Designation get 
  getListOfDesignation() {
    this.apiService.get('Designation/dropDown').subscribe((response) => {
      this.functionList = response.data;
    });
  }

}
