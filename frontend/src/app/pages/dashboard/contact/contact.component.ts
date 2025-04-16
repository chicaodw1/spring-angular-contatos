import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableComponent } from '../../../components/table/table.component';
import { PageHeaderComponent } from '../../../components/page-header/page-header.component';
import { SearchComponent } from '../../../components/search/search.component';
import { PageSizeSelectorComponent } from '../../../components/page-size-selector/page-size-selector.component';
import { PaginationComponent } from '../../../components/pagination/pagination.component';
import { ModalComponent } from '../../../components/modal/modal.component';
import { ButtonComponent } from '../../../components/button/button.component';
import { ContactService } from '../../../services/contact.service';
import { SuccessModalComponent } from '../../../components/success-modal/success-modal.component';
import { EmptyStateComponent } from '../../../components/empty-state/empty-state.component';
import { ContactModel } from '../../../models/contact.model';

@Component({
  selector: 'app-contact',
  imports: [
    CommonModule,
    FormsModule,
    TableComponent,
    PageHeaderComponent,
    SearchComponent,
    PageSizeSelectorComponent,
    PaginationComponent,
    ModalComponent,
    ButtonComponent,
    SuccessModalComponent,
    EmptyStateComponent,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  errorMessage: string | null = null;
  modalConfirmacaoAberto = false;
  mensagemConfirmacao = '';

  contatos: ContactModel[] = [];
  searchTerm = '';
  pageSize = 5;
  pageSizeOptions = [5, 10, 20, 50];
  currentPage = 1;

  modalAberto = false;
  modoEdicao = false;
  indiceEdicao: number | null = null;

  novoContato: ContactModel = this.getContatoVazio();

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.loadContatos();
  }

  loadContatos(): void {
    this.contactService.getAll().subscribe((data) => {
      this.contatos = data;
    });
  }

  getContatoVazio(): ContactModel {
    return {
      id: 0,
      name: '',
      email: '',
      cellphone: '',
      telephone: '',
      favorite: false,
      active: true,
      createdAt: new Date(),
    };
  }

  get filteredContacts(): ContactModel[] {
    return this.contatos.filter(
      (contato) =>
        contato.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        contato.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        contato.telephone
          ?.toLowerCase()
          .includes(this.searchTerm.toLowerCase()),
    );
  }

  get paginatedContacts(): ContactModel[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredContacts.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredContacts.length / this.pageSize);
  }

  openModal(): void {
    this.novoContato = this.getContatoVazio();
    this.modoEdicao = false;
    this.indiceEdicao = null;
    this.modalAberto = true;
  }

  salvarContato(contato: ContactModel): void {
    if (this.modoEdicao && this.indiceEdicao !== null) {
      this.contactService.update(contato.id, contato).subscribe({
        next: () => {
          this.loadContatos();
          this.fecharModal();
          this.errorMessage = null;
          this.mensagemConfirmacao = 'Contato atualizado com sucesso!';
          this.modalConfirmacaoAberto = true;
          this.autoFecharModalConfirmacao();
          this.refresh();
        },
        error: (err) => {
          this.errorMessage = 'Erro ao atualizar contato.';
        },
      });
    } else {
      this.contactService.create(contato).subscribe({
        next: () => {
          this.loadContatos();
          this.fecharModal();
          this.mensagemConfirmacao = 'Contato cadastrado com sucesso!';
          this.modalConfirmacaoAberto = true;
          this.autoFecharModalConfirmacao();
          this.errorMessage = null;
          this.refresh();
        },
        error: (err) => {
          this.errorMessage =
            'O celular já foi cadastrado para outra conta, ou numero é invalido';
        },
      });
    }
  }

  edit(contato: ContactModel, index: number): void {
    this.novoContato = { ...contato };
    this.modoEdicao = true;
    this.indiceEdicao = index;
    this.modalAberto = true;
  }

  toggleFavorite(contato: ContactModel): void {
    contato.favorite = !contato.favorite;
    this.contactService.update(contato.id, contato).subscribe(() => {
      this.mensagemConfirmacao = 'Contato adicionado a favoritos!';
      (this.modalConfirmacaoAberto = true),
        this.autoFecharModalConfirmacao(),
        this.refresh();
    });
  }

  inativar(contato: ContactModel): void {
    this.contactService.deactivate(contato.id).subscribe(() => {
      this.mensagemConfirmacao = 'Contato desativado com sucesso!!';
      (this.modalConfirmacaoAberto = true),
        this.autoFecharModalConfirmacao(),
        this.refresh();
    });
  }

  setPageSize(size: number): void {
    this.pageSize = size;
    this.currentPage = 1;
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  prevPage(): void {
    if (this.currentPage > 1) this.currentPage--;
  }

  fecharModal(): void {
    this.modalAberto = false;
  }

  autoFecharModalConfirmacao(): void {
    setTimeout(() => {
      this.modalConfirmacaoAberto = false;
    }, 3000);
  }

  fecharModalConfirmacao(): void {
    this.modalConfirmacaoAberto = false;
  }

  refresh(): void {
    this.contactService.clearCache();
    this.ngOnInit();
  }
}
