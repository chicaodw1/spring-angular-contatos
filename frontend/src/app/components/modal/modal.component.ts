import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-modal',
  imports: [CommonModule, FormsModule, AlertComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  @Input() errorMessage: string | null = null;

  @Input() contato: any = {};
  @Input() modoEdicao: boolean = false;

  @Output() salvar = new EventEmitter<any>();
  @Output() fechar = new EventEmitter<void>();

  submitForm(form: any) {
    if (form.valid) {
      this.salvar.emit({ ...this.contato });
    }
  }

  onCancel() {
    this.fechar.emit();
  }
}
