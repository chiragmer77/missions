import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    ConfirmationModalComponent
  ],
  exports: [ConfirmationModalComponent],
  imports: [
    CommonModule,
    ToastrModule.forRoot(),
  ],
})
export class SharedModule { }
