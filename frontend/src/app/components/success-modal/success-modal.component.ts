import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-success-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './success-modal.component.html',
  styleUrl: './success-modal.component.css',
})
export class SuccessModalComponent {
  @Input() isOpen: boolean = false;
  @Input() message: string = 'Operação realizada com sucesso!';
  @Output() close = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }
}
