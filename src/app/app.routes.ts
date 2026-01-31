import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { GaleriaComponent } from './pages/galeria/galeria.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { ListadoRegistrosComponent } from './pages/listado-registros/listado-registros.component';
import {FormularioRegistroArticulosComponent } from './pages/formulario-registro-articulos/formulario-registro-articulos.component';
import {ListadoArticulosComponent } from './pages/listado-articulos/listado-articulos.component';


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
    path: "formulario-articulos",
    component: FormularioRegistroArticulosComponent
  },
  {
    path: "listado-articulos",
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
    path: 'chat_qwen',
    loadComponent: () => import('./pages/chat-qwen/chat-qwen.page').then( m => m.ChatQwenPage)
  },
  {
    path: 'rm-graphql',
    loadComponent: () => import('./pages/rm-graphql/rm-graphql.page').then( m => m.RmGraphqlPage)
  },  {
    path: 'rm-episodios',
    loadComponent: () => import('./pages/rm-episodios/rm-episodios.page').then( m => m.RmEpisodiosPage)
  },
  {
    path: 'map-explorer',
    loadComponent: () => import('./pages/map-explorer/map-explorer.page').then( m => m.MapExplorerPage)
  },
  {
    path: 'permisos',
    loadComponent: () => import('./pages/permisos/permisos.page').then( m => m.PermisosPage)
  },



  

];
