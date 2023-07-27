import { Component, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AddClientsComponent } from './add-clients/add-clients.component';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent {
  @ViewChild(AddClientsComponent) childComponent: AddClientsComponent | undefined;
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

  clientsLists: any = [];


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
    this.apiService.getWithParams('AppClient',
      `IsHideCount=${this.pagePayload.IsHideCount}&Search=${this.pagePayload.Search}&IsDescending=${this.pagePayload.IsDescending}&Page=${this.pagePayload.Page}&PageSize=${this.pagePayload.PageSize}`).subscribe((response) => {
        this.clientsLists = response.data;
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
      this.apiService.delete(`AppClient/${this.data.id}`).subscribe((response) => {
        if (response.success) {
          this.toaster.success('Client Delete Successfully!');
          this.getMemberLists();
        }
      });
    }
    this.isConfirmationModalOpen = !this.isConfirmationModalOpen;
  }

  // Delete
  delete(data: any) {
    this.modalTitle = 'Delete Client';
    this.modalMessage = 'Are you sure you want to delete ' + data.name + ' from clients?';
    this.data = data;
    this.isConfirmationModalOpen = !this.isConfirmationModalOpen;
  }
}
