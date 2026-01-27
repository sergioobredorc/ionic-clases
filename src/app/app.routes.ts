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
    path: 'listado-registros',
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
    path: 'gallery',
    loadComponent: () => import('./pages/gallery/gallery.page').then( m => m.GalleryPage)
  },
  {
    path: 'chat',
    loadComponent: () => import('./pages/chat/chat.page').then( m => m.ChatPage)
  },
  {
    path: 'llama',
    loadComponent: () => import('./pages/openrouter/openrouter.page').then( m => m.OpenrouterPage)
  },


];
