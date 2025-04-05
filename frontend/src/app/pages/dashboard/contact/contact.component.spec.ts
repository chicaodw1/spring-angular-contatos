import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactComponent } from './contact.component';
import { ContactService } from '../../../services/contact.service';
import { of } from 'rxjs';
import { Contact } from '../../../models/contact.model';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let mockContactService: jasmine.SpyObj<ContactService>;

  const mockContacts: Contact[] = [
    {
      id: 1,
      name: 'João',
      email: 'joao@email.com',
      cellphone: '999999999',
      telephone: '88888888',
      favorite: false,
      active: true,
      createdAt: new Date(),
    },
  ];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ContactService', [
      'getAll',
      'create',
      'update',
      'deactivate',
      'clearCache',
    ]);

    await TestBed.configureTestingModule({
      imports: [ContactComponent],
      providers: [{ provide: ContactService, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    mockContactService = TestBed.inject(
      ContactService,
    ) as jasmine.SpyObj<ContactService>;

    mockContactService.getAll.and.returnValue(of(mockContacts));

    fixture.detectChanges(); // chama ngOnInit
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve carregar contatos ao inicializar', () => {
    expect(component.contatos.length).toBeGreaterThan(0);
    expect(mockContactService.getAll).toHaveBeenCalled();
  });

  it('deve abrir o modal em modo de criação', () => {
    component.openModal();
    expect(component.modalAberto).toBeTrue();
    expect(component.modoEdicao).toBeFalse();
    expect(component.indiceEdicao).toBeNull();
  });

  it('deve preparar contato para edição', () => {
    const contato = mockContacts[0];
    component.edit(contato, 0);
    expect(component.novoContato.name).toBe(contato.name);
    expect(component.modoEdicao).toBeTrue();
    expect(component.modalAberto).toBeTrue();
  });

  it('deve atualizar um contato favorito', () => {
    const contato = { ...mockContacts[0] };
    mockContactService.update.and.returnValue(of(contato));
    component.toggleFavorite(contato);
    expect(mockContactService.update).toHaveBeenCalledWith(contato.id, contato);
  });
});
