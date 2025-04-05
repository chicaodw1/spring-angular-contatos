import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { ResetPasswordComponent } from './reset-password.component';
import { AuthService } from '../../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DefaultAuthLayoutComponent } from '../../../components/auth/default-auth-layout/default-auth-layout.component';
import { AlertComponent } from '../../../components/alert/alert.component';
import { InputFieldComponent } from '../../../components/auth/input-field/input-field.component';
import { ButtonComponent } from '../../../components/button/button.component';
import { AuthTitleComponent } from '../../../components/auth/auth-title/auth-title.component';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['forgotPassword']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    routerSpy.navigate.and.returnValue(Promise.resolve(true));

    await TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParamMap: {
                get: () => null,
              },
            },
          },
        },
      ],
    })
      .overrideComponent(ResetPasswordComponent, {
        set: {
          imports: [
            CommonModule,
            ReactiveFormsModule,
            DefaultAuthLayoutComponent,
            AlertComponent,
            InputFieldComponent,
            ButtonComponent,
            AuthTitleComponent,
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve redirecionar para /nova-senha após reset com sucesso', fakeAsync(async () => {
    const email = 'teste@email.com';
    component.form.setValue({ email });
    authServiceSpy.forgotPassword.and.returnValue(
      Promise.resolve({
        isPasswordReset: false,
        nextStep: {
          resetPasswordStep: 'CONFIRM_RESET_PASSWORD_WITH_CODE',
          codeDeliveryDetails: {
            deliveryMedium: 'EMAIL',
            destination: 'email@email.com',
            attributeName: 'email',
          },
        },
      }),
    );

    await component.submit();
    tick();

    expect(authServiceSpy.forgotPassword).toHaveBeenCalledWith(email);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/nova-senha'], {
      queryParams: { email },
    });
  }));

  it('deve redirecionar mesmo se forgotPassword lançar erro (por segurança)', fakeAsync(async () => {
    const email = 'teste@email.com';
    component.form.setValue({ email });
    authServiceSpy.forgotPassword.and.returnValue(Promise.reject('Erro'));

    await component.submit();
    tick();

    expect(authServiceSpy.forgotPassword).toHaveBeenCalledWith(email);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/nova-senha'], {
      queryParams: { email },
    });
  }));

  it('não deve chamar o serviço se o formulário for inválido', async () => {
    component.form.setValue({ email: '' });
    await component.submit();
    expect(authServiceSpy.forgotPassword).not.toHaveBeenCalled();
  });
});
