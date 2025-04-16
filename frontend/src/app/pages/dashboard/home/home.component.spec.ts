import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { of } from 'rxjs';
import { ContactService } from '../../../services/contact.service';
import { Indicadores } from '../../../models/indicadores.model';
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  PieController,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { ContactModel } from '../../../models/contact.model';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockContactService: jasmine.SpyObj<ContactService>;

  beforeEach(async () => {
    // Registrar os controladores do Chart.js
    Chart.register(
      BarController,
      BarElement,
      CategoryScale,
      LinearScale,
      PieController,
      ArcElement,
      Tooltip,
      Legend,
    );

    mockContactService = jasmine.createSpyObj('ContactService', [
      'getIndicadores',
      'getAll',
    ]);

    const mockIndicadores: Indicadores = {
      totalContatos: 100,
      totalFavoritos: 40,
      totalInativos: 10,
      contatosPorMes: {
        Janeiro: 10,
        Fevereiro: 20,
        Março: 30,
      },
      ativosInativos: {
        Ativos: 90,
        Inativos: 10,
      },
    };

    const mockContatos: ContactModel[] = [
      {
        id: 1,
        name: 'João',
        email: 'joao@email.com',
        cellphone: '99999-0001',
        createdAt: new Date('2024-03-01'),
        favorite: true,
        active: true,
      },
      {
        id: 2,
        name: 'Maria',
        email: 'maria@email.com',
        cellphone: '99999-0002',
        createdAt: new Date('2024-03-02'),
        favorite: false,
        active: true,
      },
      {
        id: 3,
        name: 'Pedro',
        email: 'pedro@email.com',
        cellphone: '99999-0003',
        createdAt: new Date('2024-03-03'),
        favorite: true,
        active: false,
      },
      {
        id: 4,
        name: 'Ana',
        email: 'ana@email.com',
        cellphone: '99999-0004',
        createdAt: new Date('2024-03-04'),
        favorite: false,
        active: true,
      },
    ];

    mockContactService.getIndicadores.and.returnValue(of(mockIndicadores));
    mockContactService.getAll.and.returnValue(of(mockContatos));

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [{ provide: ContactService, useValue: mockContactService }],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve carregar os cards corretamente', () => {
    expect(component.cards.length).toBe(3);
    expect(component.cards[0].title).toBe('Total de Contatos');
    expect(component.cards[0].value).toBe(100);
  });

  it('deve carregar os gráficos corretamente', () => {
    expect(component.charts.length).toBe(2);
    expect(component.charts[0].title).toBe('Contatos por Mês');
    expect(component.charts[1].type).toBe('pie');
  });

  it('deve carregar os 3 últimos contatos', () => {
    expect(component.ultimosContatos.length).toBe(3);
    expect(component.ultimosContatos[0].name).toBe('Ana');
    expect(component.ultimosContatos[1].name).toBe('Pedro');
    expect(component.ultimosContatos[2].name).toBe('Maria');
  });
});
