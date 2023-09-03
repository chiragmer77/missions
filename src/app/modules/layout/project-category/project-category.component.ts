import { Component, ViewChild } from '@angular/core';
import { AddProjectCategoryComponent } from './add/add.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { debounceTime } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-project-category',
  templateUrl: './project-category.component.html',
  styleUrls: ['./project-category.component.css']
})
export class ProjectCategoryComponent {

  @ViewChild(AddProjectCategoryComponent) childComponent: AddProjectCategoryComponent | undefined;
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
  categoryLists: any = [];
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
    this.getCategoryLists();
  }

  /** Get Member lists */
  getCategoryLists() {
    this.apiService.getWithParams('ProjectCategory',
      `IsHideCount=${this.pagePayload.IsHideCount}&Search=${this.pagePayload.Search}&IsDescending=${this.pagePayload.IsDescending}&Page=${this.pagePayload.Page}&PageSize=${this.pagePayload.PageSize}`).subscribe((response) => {
        this.categoryLists = response.data;
        this.totalCount = response.count;
        this.skeletons = false;
      });
  }

  /** Child component close */
  handleChildComponentClose() {
    // This method will be called when the child component is closed
    this.getCategoryLists();
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
      this.apiService.delete(`ProjectCategory/${this.data.id}`).subscribe((response) => {
        if (response.success) {
          this.toaster.success('Category Delete Successfully!');
          this.getCategoryLists();
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

  /** Toggle search input */
  toggleSearchInput() {
    this.isSearchVisible = !this.isSearchVisible;
  }

  /** Close search input */
  closeSearchInput() {
    this.isSearchVisible = false;
    if (this.pagePayload.Search) {
      this.pagePayload.Search = '';
      this.updateSearchQuery();
    }
  }

  /** search the client */
  onSearch(query: string) {
    this.getCategoryLists();
  }

  // Call this function when the input value changes
  updateSearchQuery() {
    this.categoryLists = [];
    this.skeletons = true;
    this.sharedService.searchSubject.next(this.pagePayload.Search);
  }

  /** Page change event */
  getPage(event: any) {
    this.categoryLists = [];
    this.skeletons = true;
    this.p = event;
    this.pagePayload.Page = event;
    this.getCategoryLists();
  }
}
