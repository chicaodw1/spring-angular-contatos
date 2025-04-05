import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ResetPasswordComponent } from './pages/auth/reset-password/reset-password.component';
import { NewPasswordComponent } from './pages/auth/new-password/new-password.component';
import { authGuard } from './guards/auth/auth.guard';
import { questGuard } from './guards/quest/quest.guard';
import { HomeComponent } from './pages/dashboard/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ContactComponent } from './pages/dashboard/contact/contact.component';
import { ProfileComponent } from './pages/dashboard/profile/profile.component';
import { ConfirmAccountComponent } from './pages/auth/confirm-account/confirm-account.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [questGuard] },
  {
    path: 'cadastro',
    component: RegisterComponent,
    canActivate: [questGuard],
  },
  {
    path: 'confirmar',
    component: ConfirmAccountComponent,
    canActivate: [questGuard],
  },
  {
    path: 'redefinir-senha',
    component: ResetPasswordComponent,
    canActivate: [questGuard],
  },
  {
    path: 'nova-senha',
    component: NewPasswordComponent,
    canActivate: [questGuard],
  },

  {
    path: 'dashboard',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'contacts', component: ContactComponent },
      { path: 'profile', component: ProfileComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];
