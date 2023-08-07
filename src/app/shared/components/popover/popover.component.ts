import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.css']
})
export class PopoverComponent {
  @Input() isOpenFilter: boolean | undefined;
  @Output() onCloseFilter: EventEmitter<any> = new EventEmitter<any>();
  clientList: any = [];
  memberList: any = [];

  constructor(private apiService: ApiService) {

  }

  ngOnInit(): void {
    this.getClientList();
    this.getMemberList();
  }

  onCancel() {
    this.isOpenFilter = false;
    this.onCloseFilter.emit(false);
  }

  onConfirm() {
    // Emit an event or perform any specific action here
    this.onCloseFilter.emit(true);
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
