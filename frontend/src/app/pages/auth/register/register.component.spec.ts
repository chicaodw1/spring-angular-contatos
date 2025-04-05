import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { AuthService } from '../../../services/auth.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let router: Router;

  beforeEach(async () => {
    const authServiceMock = jasmine.createSpyObj('AuthService', ['signUp']);

    await TestBed.configureTestingModule({
      imports: [
        RegisterComponent,
        RouterTestingModule.withRoutes([]), // <-- Aqui está o segredo
      ],
      providers: [{ provide: AuthService, useValue: authServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('não deve chamar signUp se o formulário for inválido', async () => {
    component.form.setValue({ name: '', email: '', senha: '' });
    await component.submit();
    expect(authServiceSpy.signUp).not.toHaveBeenCalled();
    expect(component.mensagemErro).toBe('');
  });

  it('deve registrar o usuário e redirecionar ao sucesso', fakeAsync(async () => {
    const email = 'teste@email.com';
    const senha = 'Senha123!';
    const name = 'Chicão';

    component.form.setValue({ name, email, senha });
    authServiceSpy.signUp.and.resolveTo({
      isSignUpComplete: true,
      nextStep: { signUpStep: 'DONE' },
    });

    const navigateSpy = spyOn(router, 'navigate');

    await component.submit();
    tick();

    expect(authServiceSpy.signUp).toHaveBeenCalledWith(email, senha, name);
    expect(navigateSpy).toHaveBeenCalledWith(['/confirmar'], {
      queryParams: { email },
    });
  }));

  it('deve exibir mensagem de erro se signUp falhar', fakeAsync(async () => {
    component.form.setValue({
      name: 'Erro',
      email: 'erro@email.com',
      senha: '123456',
    });

    authServiceSpy.signUp.and.rejectWith(new Error('E-mail já está em uso'));

    await component.submit();
    tick();

    expect(component.mensagemErro).toBe('E-mail já está em uso');
  }));
});
