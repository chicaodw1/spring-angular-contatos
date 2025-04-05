import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-indicators',
  imports: [CommonModule],
  templateUrl: './card-indicators.component.html',
  styleUrl: './card-indicators.component.css'
})
export class CardIndicatorsComponent {
  @Input() title!: string;
  @Input() value!: number;
  @Input() icon!: string;
  @Input() bgClass: string = 'text-bg-primary';
  @Input() footer!: string;
}
