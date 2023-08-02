import { Component, ElementRef, ViewChild } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-mission-detail',
  templateUrl: './mission-detail.component.html',
  styleUrls: ['./mission-detail.component.css']
})
export class MissionDetailComponent {
  @ViewChild('myTabs') myTabs!: ElementRef;

  projectObj: any;
  clickedTab: any = 'Overview-tab';

  constructor(private sharedDataService: SharedService) { }

  ngOnInit(): void {
    const storedData = localStorage.getItem('projectData');
    if (storedData) {
      this.projectObj = JSON.parse(storedData);
    }
    console.log(this.projectObj)
  }


  handleChildComponentClose() {

  }

  // Tab Click
  tabClick(event: Event) {
    const clickedTab = (event.target as HTMLElement).getAttribute('data-tab');
    if (clickedTab) {
      this.clickedTab = clickedTab;
    }
  }
}
