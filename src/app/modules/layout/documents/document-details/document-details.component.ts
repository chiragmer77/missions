import { Component } from '@angular/core';

@Component({
  selector: 'app-document-details',
  templateUrl: './document-details.component.html',
  styleUrls: ['./document-details.component.css']
})
export class DocumentDetailsComponent {
  isSidebarOpenClose: boolean = false;


  // sidebar open close
  sidebarOpenClose() {
    this.isSidebarOpenClose = !this.isSidebarOpenClose;
  }
}
