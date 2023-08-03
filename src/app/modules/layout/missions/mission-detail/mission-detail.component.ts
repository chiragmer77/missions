import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-mission-detail',
  templateUrl: './mission-detail.component.html',
  styleUrls: ['./mission-detail.component.css']
})
export class MissionDetailComponent {
  @ViewChild('myTabs') myTabs!: ElementRef;
  previousTab: string = 'Overview-tab';
  projectObj: any;
  clickedTab: any = 'Overview-tab';

  constructor(
    private sharedDataService: SharedService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const storedData = localStorage.getItem('projectData');
    if (storedData) {
      this.projectObj = JSON.parse(storedData);
    }
    const previousTabId: any = localStorage.getItem('previousTab');
    // If there is a previous tab, set the previousTab variable
    if (previousTabId) {
      this.previousTab = previousTabId;
    }
  }


  handleChildComponentClose() {

  }

  // Tab Click
  tabClick(event: Event) {
    const clickedTab = (event.target as HTMLElement).getAttribute('data-tab');
    if (clickedTab) {
      this.clickedTab = clickedTab;
    }
    // Get the ID of the currently clicked tab
    const currentTabId: any = (event.target as HTMLButtonElement).getAttribute('data-tab');
    // Check if there was a previous active tab
    if (this.previousTab !== null) {
      // Here you can perform any actions related to the previous tab if needed
      console.log(`Previous active tab: ${this.previousTab}`);
    }
    // Update the previousTab variable to the ID of the current tab
    this.previousTab = currentTabId;
    // Store the active tab ID in local storage
    localStorage.setItem('previousTab', currentTabId);
  }
}
