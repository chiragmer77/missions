import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { CommonModule } from '@angular/common';
import { PopoverComponent } from './components/popover/popover.component';
import { TooltipModule } from 'ng2-tooltip-directive';


@NgModule({
  declarations: [
    ConfirmationModalComponent,
    PopoverComponent
  ],
  exports: [ConfirmationModalComponent, TooltipModule, PopoverComponent],
  imports: [
    CommonModule,
    ToastrModule.forRoot(),
    TooltipModule
  ],
})
export class SharedModule { }
