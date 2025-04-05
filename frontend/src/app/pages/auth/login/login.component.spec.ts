import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../../services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { SignInOutput } from 'aws-amplify/auth';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const authServiceMock = jasmine.createSpyObj('AuthService', ['login']);

    await TestBed.configureTestingModule({
      imports: [LoginComponent, RouterTestingModule, ReactiveFormsModule],
      providers: [{ provide: AuthService, useValue: authServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('não deve chamar login se o formulário for inválido', async () => {
    component.form.setValue({ email: '', senha: '' });
    await component.submit();
    expect(authServiceSpy.login).not.toHaveBeenCalled();
  });

  it('deve chamar login se o formulário for válido', async () => {
    const email = 'teste@email.com';
    const senha = 'senha123';

    component.form.setValue({ email, senha });

    authServiceSpy.login.and.returnValue(
      Promise.resolve({
        accessToken: 'token',
        idToken: 'token',
      }),
    );

    await component.submit();

    expect(authServiceSpy.login).toHaveBeenCalledWith(email, senha);
  });

  it('deve exibir mensagem de erro ao falhar login', async () => {
    component.form.setValue({
      email: 'teste@email.com',
      senha: 'senha123',
    });

    authServiceSpy.login.and.returnValue(
      Promise.reject({ message: 'Usuário ou senha incorretos' }),
    );

    await component.submit();

    expect(component.mensagemErro).toBe('Usuário ou senha incorretos');
  });
});
