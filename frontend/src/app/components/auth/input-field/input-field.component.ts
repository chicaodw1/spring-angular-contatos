import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './input-field.component.html',
})
export class InputFieldComponent {
  @Input() label!: string;
  @Input() name!: string;
  @Input() type: string = 'text';
  @Input() control!: FormControl;
  @Input() placeholder: string = '';
  @Input() errorMessage: string = 'Campo inválido';

}
