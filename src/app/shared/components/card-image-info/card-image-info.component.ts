import { Component } from '@angular/core';
import { BadgeComponent } from '../badge/badge.component';

@Component({
  selector: 'app-card-image-info',
  standalone: true,
  imports: [
    BadgeComponent
  ],
  templateUrl: './card-image-info.component.html',
  styleUrl: './card-image-info.component.scss'
})
export class CardImageInfoComponent {

}
