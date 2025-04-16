import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasswordChecklistComponent } from './password-checklist.component';

describe('PasswordChecklistComponent', () => {
  let component: PasswordChecklistComponent;
  let fixture: ComponentFixture<PasswordChecklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordChecklistComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PasswordChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve validar senha com mínimo de 6 caracteres', () => {
    component.senha = 'abc123';
    expect(component.senhaTemMinimo()).toBeTrue();

    component.senha = 'a1';
    expect(component.senhaTemMinimo()).toBeFalse();
  });

  it('deve validar se possui letra maiúscula', () => {
    component.senha = 'Abc123';
    expect(component.senhaTemMaiuscula()).toBeTrue();

    component.senha = 'abc123';
    expect(component.senhaTemMaiuscula()).toBeFalse();
  });

  it('deve validar se possui letra minúscula', () => {
    component.senha = 'ABC123a';
    expect(component.senhaTemMinuscula()).toBeTrue();

    component.senha = 'ABC123';
    expect(component.senhaTemMinuscula()).toBeFalse();
  });

  it('deve validar se possui número', () => {
    component.senha = 'abcABC1';
    expect(component.senhaTemNumero()).toBeTrue();

    component.senha = 'abcABC';
    expect(component.senhaTemNumero()).toBeFalse();
  });

  it('deve validar se possui caractere especial', () => {
    component.senha = 'Abc123!';
    expect(component.senhaTemEspecial()).toBeTrue();

    component.senha = 'Abc123';
    expect(component.senhaTemEspecial()).toBeFalse();
  });
});
