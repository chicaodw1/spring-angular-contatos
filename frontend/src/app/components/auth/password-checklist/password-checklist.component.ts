import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-password-checklist',
  imports: [CommonModule],
  templateUrl: './password-checklist.component.html',
  styleUrl: './password-checklist.component.css',
})
export class PasswordChecklistComponent {
  @Input() senha: string = '';

  senhaTemMinimo(): boolean {
    return this.senha.length >= 6;
  }

  senhaTemMaiuscula(): boolean {
    return /[A-Z]/.test(this.senha);
  }

  senhaTemMinuscula(): boolean {
    return /[a-z]/.test(this.senha);
  }

  senhaTemNumero(): boolean {
    return /[0-9]/.test(this.senha);
  }

  senhaTemEspecial(): boolean {
    return /[!@#$%^&*(),.?":{}|<>]/.test(this.senha);
  }
}
