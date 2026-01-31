import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { GaleriaComponent } from './pages/galeria/galeria.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { ListadoRegistrosComponent } from './pages/listado-registros/listado-registros.component';
import { RegistroArticuloComponent } from './pages/registro-articulo/registro-articulo.component';
import { ListadoArticulosComponent } from './pages/listado-articulos/listado-articulos.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'perfil',
    component: PerfilComponent
  },
  {
    path: 'galeria',
    component: GaleriaComponent
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
    path: 'registro-articulo',
    component: RegistroArticuloComponent
  },
  {
    path: 'listado-articulos',
    component: ListadoArticulosComponent
  },
  {
    path: 'chat',
    loadComponent: () => import('./pages/chat/chat.page').then( m => m.ChatPage)
  },
  {
    path: 'episodios',
    loadComponent: () => import('./pages/episodios/episodios.page').then( m => m.EpisodiosPage)
  },
  {
    path: 'permisos',
    loadComponent: () => import('./pages/permisos/permisos.page').then( m => m.PermisosPage)
  }

];
