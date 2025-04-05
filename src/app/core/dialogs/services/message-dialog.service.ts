import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { LoadingDialogComponent } from '../loading-dialog/loading-dialog.component';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { enumMessage } from '../../enums/enum-message';
import { LoadingDialogService } from './loading-dialog.service';

@Injectable({
  providedIn: 'root',
})
export class MessageDialogService {
  private modalRef?: NgbModalRef;

  constructor(private modalService: NgbModal, private loadingDialogService: LoadingDialogService) {}

  showInformation(message: any ) {
    this.loadingDialogService.hide();
    this.hide();

    if(!this.modalRef){
      this.modalRef = this.modalService.open(MessageDialogComponent, {
        backdrop: 'static', // Evita que se cierre con un clic afuera
        keyboard: true, // No se cierra con ESC
        centered: true // Centrar modal
      });

      this.modalRef.componentInstance.title = 'Información';
      this.modalRef.componentInstance.message = message;
      this.modalRef.componentInstance.type = enumMessage.INFORMACION;
    }
  }

  showError(message: any ) {
    this.loadingDialogService.hide();
    this.hide();

    if(!this.modalRef){
      this.modalRef = this.modalService.open(MessageDialogComponent, {
        backdrop: 'static',
        keyboard: true,
        centered: true
      });

      this.modalRef.componentInstance.title = 'Error';
      this.modalRef.componentInstance.message = message;
      this.modalRef.componentInstance.type = enumMessage.ERROR;
    }
  }

  showWarning(message: any ) {
    this.loadingDialogService.hide();
    this.hide();

    if(!this.modalRef){
      this.modalRef = this.modalService.open(MessageDialogComponent, {
        backdrop: 'static',
        keyboard: true,
        centered: true
      });

      this.modalRef.componentInstance.title = 'Advertencia';
      this.modalRef.componentInstance.message = message;
      this.modalRef.componentInstance.type = enumMessage.ADVERTENCIA;
    }
  }

  showErrorObservable(error: any ) {
    this.loadingDialogService.hide();
    this.hide();

    if(!this.modalRef){
      this.modalRef = this.modalService.open(MessageDialogComponent, {
        backdrop: 'static',
        keyboard: true,
        centered: true
      });

      this.modalRef.componentInstance.title = 'Error';
      this.modalRef.componentInstance.message = error.error?.vcError? error.error?.vcError : 'Ocurrió un error interno';
      this.modalRef.componentInstance.type = enumMessage.ERROR;
    }
  }

  hide() {
    if (this.modalRef) {
      this.modalRef.close();
      this.modalRef = undefined;
    }
  }

}
