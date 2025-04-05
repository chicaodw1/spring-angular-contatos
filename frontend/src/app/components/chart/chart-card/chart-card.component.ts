import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, PLATFORM_ID } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-chart-card',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './chart-card.component.html',
  styleUrl: './chart-card.component.css'
})
export class ChartCardComponent {
  @Input() title!: string;
  @Input() data!: ChartConfiguration['data'];
  @Input() options!: ChartConfiguration['options'];
  @Input() type!: ChartType;

  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

}
