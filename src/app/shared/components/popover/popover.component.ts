import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.css']
})
export class PopoverComponent {
  @Input() isOpen: boolean | undefined;
  @Output() onCloseFilter: EventEmitter<any> = new EventEmitter<any>();


  onCancel() {
    this.isOpen = false;
    this.onCloseFilter.emit(false);
  }

  onConfirm() {
    // Emit an event or perform any specific action here
    this.onCloseFilter.emit(true);
    this.isOpen = false;
  }

}
