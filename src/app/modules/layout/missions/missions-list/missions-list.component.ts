import { Component } from '@angular/core';

@Component({
  selector: 'app-missions-list',
  templateUrl: './missions-list.component.html',
  styleUrls: ['./missions-list.component.css']
})
export class MissionsListComponent {

  /** Child component close */
  handleChildComponentClose() {
    // This method will be called when the child component is closed
  }

}
