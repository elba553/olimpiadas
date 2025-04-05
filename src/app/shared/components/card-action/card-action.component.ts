import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-icon',
  standalone: true,
  imports: [],
  templateUrl: './card-action.component.html',
  styleUrl: './card-action.component.scss'
})
export class CardIconComponent {
  @Input() card: ICardAction | undefined;
  @Input() type:CardType | undefined = 'large';

  get isSmall():boolean {
    return this.type === 'small';
  }
}

export interface ICardAction {
  icon:string;
  text:string;
}

export type CardType = 'small' | 'large';