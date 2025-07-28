import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { Marcacao } from './pages/marcacao/marcacao';
import { PerfilComponent } from './pages/perfil/perfil';
import { AuthGuard } from './guards/auth-guard';
import { ConfirmacaoComponent } from './components-marcacao/confirmacao/confirmacao';
import { CadastroComponent } from './components/cadastro/cadastro.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'confirmacao', component: ConfirmacaoComponent }, 
  { path: 'marcacao', component: Marcacao, canActivate: [AuthGuard] },
  { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] },
  { path: 'cadastro', component: CadastroComponent },
  { path: '**', redirectTo: 'home' },
 
];