import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { ConfirmAccountComponent } from './confirm-account.component';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';

@Component({ template: '' })
class DummyComponent {}

describe('ConfirmAccountComponent', () => {
  let component: ConfirmAccountComponent;
  let fixture: ComponentFixture<ConfirmAccountComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const authServiceMock = jasmine.createSpyObj('AuthService', [
      'confirmUser',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'login', component: DummyComponent },
        ]),
        ConfirmAccountComponent,
      ],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ email: 'teste@email.com' }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmAccountComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('não deve confirmar se o formulário for inválido', async () => {
    component.form.setValue({ email: '', codigo: '' });
    await component.submit();
    expect(authServiceSpy.confirmUser).not.toHaveBeenCalled();
  });

  it('deve exibir mensagem de erro se falhar', async () => {
    component.form.setValue({ email: 'teste@email.com', codigo: '0000' });
    authServiceSpy.confirmUser.and.returnValue(
      Promise.reject(new Error('Código inválido')),
    );

    await component.submit();

    expect(component.mensagemErro).toBe('Código inválido');
    expect(component.mensagemSucesso).toBe('');
  });

  it('deve confirmar a conta com sucesso', fakeAsync(async () => {
    component.form.setValue({ email: 'teste@email.com', codigo: '123456' });
    authServiceSpy.confirmUser.and.returnValue(Promise.resolve({} as any));

    await component.submit();
    tick(2500);

    expect(component.mensagemSucesso).toContain('Conta confirmada com sucesso');
  }));
});
