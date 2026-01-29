import { Routes } from '@angular/router';
import { RegistroComponent } from './pages/registro/registro.component';
import { ListadoRegistrosComponent } from './pages/listado-registros/listado-registros.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'registro',
    component: RegistroComponent
  },
  {
    path: 'registros',
    component: ListadoRegistrosComponent
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage),
  },
  {
    path: 'chat',
    loadComponent: () => import('./pages/chat/chat.page').then( m => m.ChatPage)
  },
  {
    path: 'rick-morty',
    loadComponent: () => import('./pages/rick-morty/rick-morty.page').then( m => m.RickMortyPage)
  },  {
    path: 'camara',
    loadComponent: () => import('./pages/camara/camara.page').then( m => m.CamaraPage)
  },



];