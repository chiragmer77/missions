import { Component, EventEmitter, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-document-details',
  templateUrl: './document-details.component.html',
  styleUrls: ['./document-details.component.css']
})
export class DocumentDetailsComponent {
  isSidebarOpenClose: boolean = false;
  getAllDocumentList: any = [];
  detailDocument: any = {};
  getDownloadFileUrl: any;
  @Output() sendDocName: EventEmitter<any> = new EventEmitter<any>();


  constructor(
    public sharedService: SharedService,
    private apiService: ApiService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getAllDocumentDetails();
  }


  /** Get all  Document detail */
  getAllDocumentDetails() {
    this.spinner.show();
    this.apiService.get('ProjectDocument/detail').subscribe((res: any) => {
      if (res.success) {
        this.getAllDocumentList = res.data;
        this.getAllDocumentList = this.getAllDocumentList.filter((item: any) => item.documents.length > 0);
        this.spinner.hide();
      }
    })
  }

  // sidebar open close
  sidebarOpenClose() {
    this.isSidebarOpenClose = !this.isSidebarOpenClose;
    this.isSidebarOpenClose == true ? this.spinner.show('spinner1') : this.spinner.hide('spinner1');
  }

  /** View doc detail */
  viewDocDetail(name: any, doc: any) {
    this.detailDocument.name = name;
    this.detailDocument.doc = doc;
  }

  /** View Documents */
  viewDocuments(data: any) {
    this.spinner.show();
    this.apiService.get(`ProjectDocument/download/${data.doc.id}`).subscribe((response) => {
      if (response.success) {
        this.getDownloadFileUrl = decodeURIComponent(response.downloadUrl);
        window.open(this.getDownloadFileUrl, '_blank');
        this.spinner.hide();
      }
    });
  }
}
