import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AlertComponent } from '../alert/alert.component';
import { ContactModel } from '../../models/contact.model';

import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
@Component({
  selector: 'app-modal',
  imports: [CommonModule, FormsModule, AlertComponent, NgxMaskDirective],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
  providers: [provideNgxMask()],
})
export class ModalComponent {
  @Input() errorMessage: string | null = null;

  @Input() contato: ContactModel = {
    id: 0,
    name: '',
    email: '',
    cellphone: '',
    telephone: '',
    favorite: false,
    active: true,
    createdAt: new Date(),
  };

  @Input() modoEdicao: boolean = false;

  @Output() salvar = new EventEmitter<any>();
  @Output() fechar = new EventEmitter<void>();

  submitForm(form: NgForm) {
    if (!form.valid) {
      form.controls['email']?.markAsTouched();
      form.controls['name']?.markAsTouched();
      form.controls['cellphone']?.markAsTouched();
      return;
    }

    this.salvar.emit({ ...this.contato });
  }

  onCancel() {
    this.fechar.emit();
  }
}
