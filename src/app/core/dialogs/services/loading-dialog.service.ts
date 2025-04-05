import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { LoadingDialogComponent } from '../loading-dialog/loading-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class LoadingDialogService {
  private modalRef?: NgbModalRef;

  constructor(private modalService: NgbModal) {}

  show() {
    this.hide();
    if (!this.modalRef) {
      this.modalRef = this.modalService.open(LoadingDialogComponent, {
        backdrop: 'static', // Evita que se cierre con un clic afuera
        keyboard: false, // No se cierra con ESC
        centered: true // Centrar modal
      });
    }
  }

  hide() {
    if (this.modalRef) {
      this.modalRef.close();
      this.modalRef = undefined;
    }
  }
}
