import { Component } from '@angular/core';
import { BadgeComponent } from '../badge/badge.component';

@Component({
  selector: 'app-card-user-info',
  standalone: true,
  imports: [
    BadgeComponent
  ],
  templateUrl: './card-user-info.component.html',
  styleUrl: './card-user-info.component.scss'
})
export class CardUserInfoComponent {

}
