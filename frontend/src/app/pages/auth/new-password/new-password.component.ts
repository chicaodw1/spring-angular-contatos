import { Component, OnInit } from '@angular/core';
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
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { AlertComponent } from '../../../components/alert/alert.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-password',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    DefaultAuthLayoutComponent,
    AuthTitleComponent,
    InputFieldComponent,
    ButtonComponent,
    AlertComponent,
  ],
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.css',
})
export class NewPasswordComponent implements OnInit {
  mensagemErro = '';
  form!: FormGroup<{
    verificationCode: FormControl<string>;
    newPassword: FormControl<string>;
    password: FormControl<string>;
  }>;

  private email = '';

  constructor(
    private fb: NonNullableFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.email = this.route.snapshot.queryParamMap.get('email') || '';
    this.form = this.fb.group({
      verificationCode: this.fb.control('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      newPassword: this.fb.control('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      password: this.fb.control('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  async submit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const code = this.form.controls.verificationCode.value;
    const password = this.form.controls.password.value;
    const confirmPassword = this.form.controls.newPassword.value;

    if (password !== confirmPassword) {
      this.mensagemErro = 'As senhas não coincidem.';
      return;
    }

    if (!this.email) {
      this.mensagemErro = 'Email inválido. Tente iniciar o processo novamente.';
      return;
    }

    try {
      await this.authService.confirmNewPassword(this.email, code, password);
      this.mensagemErro = '';
      this.router.navigate(['/login']);
    } catch (err: any) {
      console.error('Erro ao redefinir senha:', err);
      this.mensagemErro =
        err?.message || 'Erro ao redefinir senha. Tente novamente.';
    }
  }
}
