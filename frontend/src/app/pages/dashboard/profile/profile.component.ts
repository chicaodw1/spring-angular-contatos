import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  user: { name?: string; email?: string } = {};

  perfil = {
    nome: '',
    email: '',
  };

  previewUrl: string | null = null;

  constructor(private authService: AuthService) {}

  async ngOnInit() {
    try {
      const userInfo = await this.authService.getUserInfo();
      this.user = {
        name: userInfo.attributes.name,
        email: userInfo.attributes.email,
      };

      this.perfil = {
        nome: userInfo.attributes.name || '',
        email: userInfo.attributes.email || '',
      };
    } catch (error) {
      console.error('Erro ao carregar perfil', error);
    }
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewUrl = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  salvar() {
    console.log('Perfil salvo:', this.perfil);
  }
}
