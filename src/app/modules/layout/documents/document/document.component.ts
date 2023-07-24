import { Component } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent {

  ngOnInit(): void {

    // Open
    $('#sideFormOpen').on('click', () => {
      $('.sideFormFields').toggleClass('ShowFields');
    });
    // close
    $('#sidebarClose').on('click', () => {
      $('.sideFormFields').toggleClass('ShowFields');
    });
    // Close button
    $('#sidebarCloseButton').on('click', () => {
      $('.sideFormFields').toggleClass('ShowFields');
    });

  }

}
