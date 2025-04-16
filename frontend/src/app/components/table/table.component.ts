import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ContactModel } from '../../models/contact.model';

@Component({
  selector: 'app-table',
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  @Input() contatos: ContactModel[] = [];

  @Input() exibirAcoes: boolean = true;

  @Input() titulo: string = '';

  @Output() editar = new EventEmitter<{ contato: any; index: number }>();
  @Output() favoritar = new EventEmitter<any>();
  @Output() inativar = new EventEmitter<any>();

  onEdit(contato: any, index: number) {
    this.editar.emit({ contato, index });
  }

  onFavoritar(contato: any) {
    this.favoritar.emit(contato);
  }

  onInativar(contato: any) {
    this.inativar.emit(contato);
  }
}
