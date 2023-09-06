import { Component } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent {

  documentName: any = [];

  ngOnInit(): void {
  }

  /* show document name */
  // viewDocName(event: any) {
  //   event.map((data: any) => {
  //     if (data.documents?.length !== 0) {
  //       this.documentName = data.name;
  //     }
  //   });
  // }

}
