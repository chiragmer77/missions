import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent {
  @Output() onClose: EventEmitter<any> = new EventEmitter<any>();
  @Input() isOpen: boolean | undefined;
  @Input() title: string | undefined;
  @Input() message: string | undefined;

  onCancel() {
    this.isOpen = false;
    this.onClose.emit(false);
  }

  onConfirm() {
    // Emit an event or perform any specific action here
    this.onClose.emit(true);
    this.isOpen = false;
  }
}
