import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { enumMessage } from '../../enums/enum-message';

@Component({
  selector: 'app-confirm-dialog',
  imports: [],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent {
  @Input() title: string = 'Confirmación';
  @Input() description: string = '¿Estás seguro?';
  @Input() textOk: string = 'Aceptar';
  @Input() textCancel: string = 'Cancelar';
  @Input() type: any = enumMessage.ADVERTENCIA;

  types: any = enumMessage;

  constructor(public activeModal: NgbActiveModal) {}

  accept() {
    this.activeModal.close(true);
  }

  cancel() {
    this.activeModal.dismiss(false);
  }
}
