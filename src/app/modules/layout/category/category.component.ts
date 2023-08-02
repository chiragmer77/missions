import { Component, ViewChild } from '@angular/core';
import { AddCategoryComponent } from './add/add.component';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  @ViewChild(AddCategoryComponent) childComponent: AddCategoryComponent | undefined;
  isConfirmationModalOpen: boolean = false;
  modalTitle: string = '';
  modalMessage: string = '';
  data: any;
  pagePayload: any = {
    IsHideCount: true,
    Search: '',
    IsDescending: true,
    Page: 1,
    PageSize: 10,
    OrderBy: ''
  }

  categoryLists: any = [];


  constructor(
    private apiService: ApiService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService
  ) { }


  ngOnInit(): void {
    this.getMemberLists();
  }

  /** Get Member lists */
  getMemberLists() {
    this.spinner.show();
    this.apiService.getWithParams('ProjectTaskCategory',
      `IsHideCount=${this.pagePayload.IsHideCount}&Search=${this.pagePayload.Search}&IsDescending=${this.pagePayload.IsDescending}&Page=${this.pagePayload.Page}&PageSize=${this.pagePayload.PageSize}`).subscribe((response) => {
        this.categoryLists = response.data;
        this.spinner.hide();
      });
  }

  /** Child component close */
  handleChildComponentClose() {
    // This method will be called when the child component is closed
    this.getMemberLists();
  }

  /** Edit Client details */
  editDetails(data: any) {
    this.childComponent!.handleEventInChild(data);
  }

  // You can handle the confirmation result here, for example:
  onConfirm() {
    // Perform the action you need to execute after confirmation
    this.isConfirmationModalOpen = false;
    // ...
  }

  // On Close Confirmation Modal
  onCloseConfirmationModal(event: any) {
    if (event) {
      this.apiService.delete(`ProjectTaskCategory/${this.data.id}`).subscribe((response) => {
        if (response.success) {
          this.toaster.success('Category Delete Successfully!');
          this.getMemberLists();
        }
      });
    }
    this.isConfirmationModalOpen = !this.isConfirmationModalOpen;
  }

  // Delete
  delete(data: any) {
    this.modalTitle = 'Delete Category';
    this.modalMessage = 'Are you sure you want to delete ' + data.name + ' from Category?';
    this.data = data;
    this.isConfirmationModalOpen = !this.isConfirmationModalOpen;
  }
}
