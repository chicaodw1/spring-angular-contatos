import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardIndicatorsComponent } from '../../../components/card-indicators/card-indicators.component';
import { ChartCardComponent } from '../../../components/chart/chart-card/chart-card.component';
import { ChartType } from 'chart.js';
import { TableComponent } from '../../../components/table/table.component';
import { Contact } from '../../../models/contact.model';
import { Indicadores } from '../../../models/indicadores.model';
import { ContactService } from '../../../services/contact.service';
import { CardData } from '../../../models/card-data.models';
import { ChartDataCustom } from '../../../models/chart-data.model';
import { HttpClientModule } from '@angular/common/http';
import { forkJoin, take } from 'rxjs';
import { EmptyStateComponent } from "../../../components/empty-state/empty-state.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    HttpClientModule,
    CardIndicatorsComponent,
    ChartCardComponent,
    TableComponent,
    EmptyStateComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  cards: CardData[] = [];
  charts: ChartDataCustom[] = [];
  ultimosContatos: Contact[] = [];
  isLoading = true;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    forkJoin({
      indicadores: this.contactService.getIndicadores().pipe(take(1)),
      contatos: this.contactService.getAll().pipe(take(1)),
    }).subscribe(({ indicadores, contatos }) => {
      this.setIndicadores(indicadores);
      this.ultimosContatos = contatos.slice(-3).reverse();
      this.isLoading = false;
    });
  }

  setIndicadores(data: Indicadores): void {
    this.cards = [
      {
        title: 'Total de Contatos',
        icon: 'bi-people-fill',
        bgClass: 'text-bg-primary',
        value: data.totalContatos,
        footer: 'Contatos cadastrados',
      },
      {
        title: 'Favoritos',
        icon: 'bi-star-fill',
        bgClass: 'text-bg-warning text-dark',
        value: data.totalFavoritos,
        footer: 'Contatos favoritos',
      },
      {
        title: 'Inativos',
        icon: 'bi-slash-circle',
        bgClass: 'text-bg-danger',
        value: data.totalInativos,
        footer: 'Contatos desativados',
      },
    ];

    const meses = Object.keys(data.contatosPorMes);
    const valores = Object.values(data.contatosPorMes);

    const ativosLabels = ['Ativos', 'Inativos'];
    const ativosValues = [
      data.ativosInativos['Ativos'] ?? 0,
      data.ativosInativos['Inativos'] ?? 0,
    ];

    this.charts = [
      {
        title: 'Contatos por Mês',
        type: 'bar' as ChartType,
        data: {
          labels: meses,
          datasets: [
            {
              label: 'Contatos',
              data: valores,
              backgroundColor: '#0d6efd',
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      },
      {
        title: 'Ativos vs Inativos',
        type: 'pie' as ChartType,
        data: {
          labels: ativosLabels,
          datasets: [
            {
              data: ativosValues,
              backgroundColor: ['#198754', '#dc3545'],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      },
    ];
  }

  loadUltimosContatos(): void {
    this.contactService.getAll().subscribe((contatos: Contact[]) => {
      this.ultimosContatos = contatos.slice(-3).reverse();
    });
  }
}
