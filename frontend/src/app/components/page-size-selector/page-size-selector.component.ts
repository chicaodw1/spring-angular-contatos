import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-page-size-selector',
  imports: [CommonModule, FormsModule],
  templateUrl: './page-size-selector.component.html',
  styleUrl: './page-size-selector.component.css'
})
export class PageSizeSelectorComponent {
  @Input() pageSize!: number;
  @Input() options: number[] = [5, 10, 20, 50];
  @Output() pageSizeChange = new EventEmitter<number>();

  onChange(size: number) {
    this.pageSizeChange.emit(size);
  }
}
