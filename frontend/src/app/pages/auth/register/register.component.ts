import { Component } from '@angular/core';
import { DefaultAuthLayoutComponent } from '../../../components/auth/default-auth-layout/default-auth-layout.component';
import { AuthTitleComponent } from '../../../components/auth/auth-title/auth-title.component';
import { InputFieldComponent } from '../../../components/auth/input-field/input-field.component';
import { ButtonComponent } from '../../../components/button/button.component';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { AlertComponent } from '../../../components/alert/alert.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    DefaultAuthLayoutComponent,
    AuthTitleComponent,
    InputFieldComponent,
    ButtonComponent,
    AlertComponent,
  ],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  mensagemErro = '';

  form!: FormGroup<{
    name: FormControl<string>;
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
      name: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      senha: this.fb.control('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  async submit(): Promise<void> {
    if (this.form.valid) {
      const name = this.form.controls.name.value;
      const email = this.form.controls.email.value;
      const senha = this.form.controls.senha.value;

      try {
        await this.authService.signUp(email, senha, name);
        this.mensagemErro = '';
        this.router.navigate(['/confirmar'], { queryParams: { email } });
      } catch (err: any) {
        console.error('Erro no cadastro:', err);

        if (err instanceof Error && err.message) {
          this.mensagemErro = err.message;
        } else if (typeof err === 'string') {
          this.mensagemErro = err;
        } else {
          this.mensagemErro = 'Erro inesperado no cadastro.';
        }
      }
    } else {
      this.form.markAllAsTouched();
    }
  }
}
