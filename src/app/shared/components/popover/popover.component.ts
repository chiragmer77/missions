import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.css']
})
export class PopoverComponent {
  @Input() isOpenFilter: boolean | undefined;
  @Output() onClose: EventEmitter<any> = new EventEmitter<any>();
  clientList: any = [];
  memberList: any = [];
  selectedClient: any;
  selectedStatus: any;
  selectedMember: any;

  constructor(private apiService: ApiService) {

  }

  ngOnInit(): void {
    this.getClientList();
    this.getMemberList();
  }

  onCancel() {
    this.selectedClient = null;
    this.selectedStatus = null;
    this.selectedMember = null;
    const result = {
      action: false
    }
    this.onClose.emit(result);
    this.isOpenFilter = false;
  }

  onConfirm() {
    // Emit an event or perform any specific action here
    const result = {
      clientName: this.selectedClient,
      status: this.selectedStatus == 'Not-Started' ? 1 : this.selectedStatus == 'In-Progress' ? 2 : this.selectedStatus == 'Completed' ? 3 : null,
      member: this.selectedMember,
      action: true
    }
    this.onClose.emit(result);
    this.selectedClient = null;
    this.selectedStatus = null;
    this.selectedMember = null;
    this.isOpenFilter = false;
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
