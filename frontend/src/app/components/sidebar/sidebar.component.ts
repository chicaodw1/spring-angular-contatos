import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  isCollapsed = false;
  userName: string = 'Usuário';
  userPicture: string = 'https://placehold.co/400';

  constructor(private authService: AuthService) {}

  async ngOnInit() {
    try {
      const userInfo = await this.authService.getUserInfo();
      const attrs = userInfo.attributes;

      this.userName = attrs.name?.split(' ')[0] || 'Usuário';
      this.userPicture = attrs.picture || 'https://github.com/mdo.png';
    } catch (error) {
      console.error('Erro ao carregar usuário', error);
    }
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  logout() {
    this.authService.clearUserInfoCache();
    localStorage.removeItem('token');
    location.href = '/login';
  }
}
