import { Component, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { AddDesignatinComponent } from './add/add.component';
import { SharedService } from 'src/app/shared/services/shared.service';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.css']
})
export class DesignationComponent {
  @ViewChild(AddDesignatinComponent) childComponent: AddDesignatinComponent | undefined;
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
  p: number = 1;
  isSearchVisible = false;
  designationList: any = [];
  totalCount: any;
  skeletons: boolean = true;

  constructor(
    private apiService: ApiService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private sharedService: SharedService
  ) {
    this.sharedService.searchSubject.pipe(debounceTime(500)).subscribe((query) => {
      this.onSearch(query);
    });
  }


  ngOnInit(): void {
    this.getDesignationList();
  }

  /** Get Member lists */
  getDesignationList() {
    this.apiService.getWithParams('Designation',
      `IsHideCount=${this.pagePayload.IsHideCount}&Search=${this.pagePayload.Search}&IsDescending=${this.pagePayload.IsDescending}&Page=${this.pagePayload.Page}&PageSize=${this.pagePayload.PageSize}`).subscribe((response) => {
        this.designationList = response.data;
        this.totalCount = response.count;
        this.skeletons = false;
      });
  }

  /** Child component close */
  handleChildComponentClose() {
    // This method will be called when the child component is closed
    this.getDesignationList();
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
      this.apiService.delete(`Designation/${this.data.id}`).subscribe((response) => {
        if (response.success) {
          this.toaster.success('Designation Delete Successfully!');
          this.getDesignationList();
        }
      });
    }
    this.isConfirmationModalOpen = !this.isConfirmationModalOpen;
  }

  // Delete
  delete(data: any) {
    this.modalTitle = 'Delete Designation';
    this.modalMessage = 'Are you sure you want to delete ' + data.name + ' from Designation?';
    this.data = data;
    this.isConfirmationModalOpen = !this.isConfirmationModalOpen;
  }

  /** Toggle search input */
  toggleSearchInput() {
    this.isSearchVisible = !this.isSearchVisible;
  }

  /** Close search input */
  closeSearchInput() {
    this.isSearchVisible = false;
  }

  /** search the client */
  onSearch(query: string) {
    this.getDesignationList();
  }

  // Call this function when the input value changes
  updateSearchQuery() {
    this.designationList = [];
    this.skeletons = true;
    this.sharedService.searchSubject.next(this.pagePayload.Search);
  }

  /** Page change event */
  getPage(event: any) {
    this.designationList = [];
    this.skeletons = true;
    this.p = event;
    this.pagePayload.Page = event;
    this.getDesignationList();
  }
}
