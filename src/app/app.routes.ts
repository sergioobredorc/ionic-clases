import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { GaleriaComponent } from './pages/galeria/galeria.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { ListadoRegistrosComponent } from './pages/listado-registros/listado-registros.component';
import { RegistroArticulosComponent } from './pages/formulario-articulos/formulario-articulos.component';
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
    path: 'registroArticulos',
    component: RegistroArticulosComponent
  },
  {
    path: 'listadoArticulos',
    component: ListadoArticulosComponent
  },  {
    path: 'gallery',
    loadComponent: () => import('./pages/gallery/gallery.page').then( m => m.GalleryPage)
  },
  {
    path: 'chat',
    loadComponent: () => import('./pages/chat/chat.page').then( m => m.ChatPage)
  },
  {
    path: 'chatgpt',
    loadComponent: () => import('./pages/chatgpt/chatgpt.page').then( m => m.ChatgptPage)
  }

];
