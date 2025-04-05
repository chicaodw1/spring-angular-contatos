import { Component, OnInit } from '@angular/core';
import { DefaultAuthLayoutComponent } from '../../../components/auth/default-auth-layout/default-auth-layout.component';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../../../components/button/button.component';
import { Router, RouterModule } from '@angular/router';
import { InputFieldComponent } from '../../../components/auth/input-field/input-field.component';
import { AuthTitleComponent } from '../../../components/auth/auth-title/auth-title.component';
import { AuthService } from '../../../services/auth.service';
import { AlertComponent } from '../../../components/alert/alert.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    DefaultAuthLayoutComponent,
    ButtonComponent,
    InputFieldComponent,
    AuthTitleComponent,
    AlertComponent,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  mensagemErro = '';

  form!: FormGroup<{
    email: FormControl<string>;
    senha: FormControl<string>;
  }>;

  constructor(
    private fb: NonNullableFormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      senha: this.fb.control('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  async submit(): Promise<void> {
    if (this.form.valid) {
      const email = this.form.controls.email.value;
      const senha = this.form.controls.senha.value;

      try {
        await this.authService.login(email, senha);
        this.mensagemErro = '';

        const userInfo = await this.authService.getUserInfo();

        this.router.navigate(['/dashboard']);
      } catch (err: any) {
        console.error('Erro no login:', err);
        if (err?.name === 'NotAuthorizedException') {
          this.mensagemErro = 'Usuário ou senha incorretos.';
        } else {
          this.mensagemErro = err?.message || 'Erro inesperado no login.';
        }
      }
    } else {
      this.form.markAllAsTouched();
    }
  }
}
