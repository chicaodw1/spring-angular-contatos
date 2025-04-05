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

@Component({
  selector: 'app-reset-password',
  imports: [
    ReactiveFormsModule,
    RouterModule,
    DefaultAuthLayoutComponent,
    AuthTitleComponent,
    InputFieldComponent,
    ButtonComponent,
  ],
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent {
  mensagemErro = '';
  form!: FormGroup<{
    email: FormControl<string>;
  }>;

  constructor(
    private fb: NonNullableFormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
    });
  }

  async submit(): Promise<void> {
    if (this.form.valid) {
      const email = this.form.controls.email.value;

      try {
        await this.authService.forgotPassword(email);
        this.mensagemErro = '';
        this.router.navigate(['/nova-senha'], {
          queryParams: { email },
        });
      } catch (err: any) {
        this.router.navigate(['/nova-senha'], {
          queryParams: { email },
        });
      }
    } else {
      this.form.markAllAsTouched();
    }
  }
}
