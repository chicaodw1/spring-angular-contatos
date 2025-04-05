import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-auth-title',
  standalone: true,
  imports: [],
  templateUrl: './auth-title.component.html',
})
export class AuthTitleComponent {
  @Input() title = 'Acessar Conta';
}
