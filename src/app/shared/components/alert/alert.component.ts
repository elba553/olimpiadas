import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  standalone: true,
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  imports: [CommonModule]
})
export class AlertComponent {

  private readonly activeModal =  inject(NgbActiveModal)

  @Input() data: any;

  closeModal() {
    this.activeModal.close();
  }
}
