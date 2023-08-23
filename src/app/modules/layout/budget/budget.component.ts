import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent {

  budgetList: any = [];
  p: number = 1;
  pe: number = 1;
  clickedTab: any = 'tasks';
  skeletons: boolean = true;

  constructor(
    private apiService: ApiService,
    private toaster: ToastrService,
    public sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.getBudget();
  }

  /** Get Budget By Project */
  getBudget() {
    this.apiService.get('Project/budget').subscribe((res: any) => {
      if (res.success) {
        this.budgetList = res.data;
        this.skeletons = false;
      }
    });
  }


  // Tab Click
  tabClick(event: Event) {
    const clickedTab = (event.target as HTMLElement).getAttribute('data-tab');
    if (clickedTab) {
      this.clickedTab = clickedTab;
    }
  }

  /** Active tab */
  tabActive(type: any) {
    this.clickedTab = type;
  }
}
