import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { GaleriaComponent } from './pages/galeria/galeria.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { ListadoRegistrosComponent } from './pages/listado-registros/listado-registros.component';
import { RegistroArticuloComponent } from './pages/registro-articulo/registro-articulo.component';
import { ListadoArticulosComponent } from './pages/listado-articulos/listado-articulos.component';
import { ChatPage } from './pages/chat/chat.page';
import { Chat2Page } from './pages/chat2/chat2.page';
import { RmGraphqlPage } from './pages/rm-graphql/rm-graphql.page'; 
import { MapExplorerPage } from './pages/map/map-explorer.page';
import { EpisodesPage } from './pages/episodes/episodes.page';

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
    component: ChatPage
  },
  {
    path: 'chat2',
    component: Chat2Page
  },
  {
    path: 'rm-graphql',
    component: RmGraphqlPage
  },
  {
    path: 'episodes',
    component: EpisodesPage
  },
  {
    path: 'mapa',
    component: MapExplorerPage
  },
  {
    path: 'multimedia',
    loadComponent: () => import('./pages/multimedia/multimedia.page').then( m => m.MultimediaPage)
  }
];


