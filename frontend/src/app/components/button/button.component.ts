import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' = 'button';
  @Input() label: string = 'Botão';
  @Input() icon: string = ''; 
  @Input() variant: 'primary' | 'secondary' | 'danger' | 'success' = 'primary';
  @Input() size: 'sm' | 'lg' | 'default' = 'default';
  @Input() loading: boolean = false;
  @Input() disabled: boolean = false;

  @Output() action = new EventEmitter<void>();

  onClick() {
    if (!this.loading && !this.disabled) {
      this.action.emit();
    }
  }

  get btnClass(): string[] {
    const classes = ['btn', `btn-${this.variant}`];
    if (this.size !== 'default') {
      classes.push(`btn-${this.size}`);
    }
    return classes;
  }

}
