import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  imports: [CommonModule],
  templateUrl: './empty-state.component.html',
  styleUrl: './empty-state.component.css',
})
export class EmptyStateComponent {
  @Input() mode: 'alert' | 'card' = 'alert';
  @Input() type: 'warning' | 'info' | 'danger' | 'success' | 'secondary' =
    'warning';
  @Input() icon: string = 'bi-exclamation-triangle-fill';
  @Input() title: string = 'Nada encontrado';
  @Input() message: string = 'Não há dados para exibir.';
}
