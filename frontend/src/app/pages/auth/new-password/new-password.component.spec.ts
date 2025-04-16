import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { NewPasswordComponent } from './new-password.component';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DefaultAuthLayoutComponent } from '../../../components/auth/default-auth-layout/default-auth-layout.component';
import { AuthTitleComponent } from '../../../components/auth/auth-title/auth-title.component';
import { InputFieldComponent } from '../../../components/auth/input-field/input-field.component';
import { ButtonComponent } from '../../../components/button/button.component';
import { AlertComponent } from '../../../components/alert/alert.component';
import { PasswordChecklistComponent } from '../../../components/auth/password-checklist/password-checklist.component';

describe('NewPasswordComponent', () => {
  let component: NewPasswordComponent;
  let fixture: ComponentFixture<NewPasswordComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authServiceMock = jasmine.createSpyObj('AuthService', [
      'confirmNewPassword',
    ]);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParamMap: {
                get: () => 'user@example.com',
              },
            },
          },
        },
      ],
    })
      .overrideComponent(NewPasswordComponent, {
        set: {
          imports: [
            CommonModule,
            ReactiveFormsModule,
            RouterTestingModule,
            DefaultAuthLayoutComponent,
            AuthTitleComponent,
            InputFieldComponent,
            ButtonComponent,
            AlertComponent,
            PasswordChecklistComponent,
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(NewPasswordComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('não deve enviar se o formulário for inválido', fakeAsync(async () => {
    component.form.setValue({
      verificationCode: '',
      newPassword: '',
      password: '',
    });
    await component.submit();
    tick();
    expect(authServiceSpy.confirmNewPassword).not.toHaveBeenCalled();
  }));

  it('deve exibir erro se as senhas forem diferentes', fakeAsync(async () => {
    component.form.setValue({
      verificationCode: '123456',
      newPassword: 'senha123',
      password: 'senha321',
    });

    await component.submit();
    tick();
    fixture.detectChanges();

    expect(component.form.errors?.['passwordsMismatch']).toBeTrue();
    expect(authServiceSpy.confirmNewPassword).not.toHaveBeenCalled();
  }));

  it('deve mostrar mensagem de erro se redefinição falhar', fakeAsync(() => {
    component.form.setValue({
      verificationCode: '123456',
      newPassword: 'Senha123!',
      password: 'Senha123!',
    });

    (component as any).email = 'user@example.com';

    authServiceSpy.confirmNewPassword.and.returnValue(
      Promise.reject(new Error('Código inválido')),
    );

    component.submit().catch(() => {});
    tick();

    expect(component.mensagemErro).toBe('Código inválido');
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  }));
});
