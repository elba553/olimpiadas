import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  standalone: true,
  selector: 'app-alert-dynamic',
  templateUrl: './alert-dynamic.component.html',
  styleUrls: ['./alert-dynamic.component.scss'],
  imports: [CommonModule]
})
export class AlertDynamicComponent {

  private readonly activeModal =  inject(NgbActiveModal)

  @Output() onConfirm = new EventEmitter<boolean>();
  @Input() data: any;

  confirm() {
    this.onConfirm.emit(true);
    this.activeModal.close();
  }

  reject() {
    this.onConfirm.emit(false);
    this.activeModal.close();
  }
}
