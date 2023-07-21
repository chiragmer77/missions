import { Component } from '@angular/core';

@Component({
  selector: 'app-router-outlet',
  templateUrl: './router-outlet.component.html',
  styleUrls: ['./router-outlet.component.css']
})
export class RouterOutletComponent {
  isClassAdded: boolean = true;


  toggleClass() {
    this.isClassAdded = !this.isClassAdded;
  }

}
