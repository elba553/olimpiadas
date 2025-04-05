import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss'
})
export class BadgeComponent {
  @Input() type?:StyleBadge;
  @Input() text?:string;
}

export type StyleBadge = 'primary' | 'danger' | 'warning' | 'information' | 'success' | 'light' | 'dark';