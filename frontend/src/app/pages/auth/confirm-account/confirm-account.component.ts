import { Component } from '@angular/core';
import { DefaultAuthLayoutComponent } from '../../../components/auth/default-auth-layout/default-auth-layout.component';
import { AuthTitleComponent } from '../../../components/auth/auth-title/auth-title.component';
import { AlertComponent } from '../../../components/alert/alert.component';
import { InputFieldComponent } from '../../../components/auth/input-field/input-field.component';
import { ButtonComponent } from '../../../components/button/button.component';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-account',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    DefaultAuthLayoutComponent,
    AuthTitleComponent,
    AlertComponent,
    InputFieldComponent,
    ButtonComponent,
  ],
  templateUrl: './confirm-account.component.html',
  styleUrl: './confirm-account.component.css',
})
export class ConfirmAccountComponent {
  mensagemErro = '';
  mensagemSucesso = '';

  form!: FormGroup<{
    email: FormControl<string>;
    codigo: FormControl<string>;
  }>;

  private email = '';

  constructor(
    private fb: NonNullableFormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
  ) {
    this.form = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      codigo: this.fb.control('', [Validators.required]),
    });

    this.route.queryParams.subscribe((params) => {
      if (params['email']) {
        this.form.controls.email.setValue(params['email']);
      }
    });
  }

  async submit(): Promise<void> {
    if (this.form.valid) {
      const codigo = this.form.controls.codigo.value;
      const email = this.form.controls.email.value;

      try {
        await this.authService.confirmUser(email, codigo);
        this.mensagemErro = '';
        this.mensagemSucesso =
          'Conta confirmada com sucesso! Redirecionando...';

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2500);
      } catch (err: any) {
        console.error(err);
        this.mensagemSucesso = '';
        this.mensagemErro =
          err.message || 'Erro ao confirmar a conta. Verifique o código.';
      }
    } else {
      this.form.markAllAsTouched();
    }
  }
}
