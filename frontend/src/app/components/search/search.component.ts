import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  @Input() placeholder: string = 'Buscar...';
  @Input() model: string = '';
  @Output() modelChange = new EventEmitter<string>();

  onInput(value: string) {
    this.modelChange.emit(value);
  }
}
