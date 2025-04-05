import { CommonModule } from '@angular/common';
import { Component, Input, } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-card-informative',
  templateUrl: './box-information.component.html',
  styleUrls: ['./box-information.component.scss'],
})
export class CardInformativeComponent {
  @Input() data:IBoxInformation | undefined;
}

export interface IBoxInformation {
  title:string;
  content:string;
  actionText:string;
}