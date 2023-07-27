import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {


  pagePayload: any = {
    IsHideCount: true,
    Search: '',
    IsDescending: true,
    Page: 1,
    PageSize: 10,
    OrderBy: ''
  }

  memberLists: any = [];
  constructor(
    private apiService: ApiService
  ) { }


  ngOnInit(): void {
    this.getMemberLists();
  }

  /** Get Member lists */
  getMemberLists() {
    this.apiService.getWithParams('Member',
      `IsHideCount=${this.pagePayload.IsHideCount}&Search=${this.pagePayload.Search}&IsDescending=${this.pagePayload.IsDescending}&Page=${this.pagePayload.Page}&PageSize=${this.pagePayload.PageSize}`).subscribe((response) => {
        this.memberLists = response.data;
      });
  }

}
