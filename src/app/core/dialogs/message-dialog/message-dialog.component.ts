import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { enumMessage } from '../../enums/enum-message';

@Component({
  selector: 'app-message-dialog',
  imports: [],
  templateUrl: './message-dialog.component.html',
  styleUrl: './message-dialog.component.scss'
})
export class MessageDialogComponent {
  @Input() title: string = 'Título default';
  @Input() message: string = 'Mensaje default';
  @Input() type: any = enumMessage.INFORMACION;

  types: any = enumMessage;

  constructor(public activeModal: NgbActiveModal) {}

  accept() {
    this.activeModal.close(true);
  }

  close() {
    this.activeModal.dismiss(false);
  }
}
