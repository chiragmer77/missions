import { Component, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent {
  @Input() dataFromParent: any;
  projectRoleLists: any = [];

  constructor(
    private apiService: ApiService,
    public sharedService: SharedService,
  ) {

  }


  ngOnInit(): void {
    console.log(this.dataFromParent);
    this.getProjectRoleLists();
  }

  handleChildComponentClose() {

  }

  // Get Member List
  getProjectRoleLists() {
    this.apiService.getWithParams('ProjectRole',
      `ProjectId=${this.dataFromParent.id}`).subscribe((response) => {
        this.projectRoleLists = response.data;
      });
  }
}
