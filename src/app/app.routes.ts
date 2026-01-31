import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { GaleriaComponent } from './pages/galeria/galeria.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { ListadoRegistrosComponent } from './pages/listado-registros/listado-registros.component';
import { ChatIaComponent } from './pages/chat-ia/chat-ia.component';
import { RickMortyEpComponent } from './pages/rick-morty-ep/rick-morty-ep.component';


export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
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
    path: 'registroarticulos',
    loadComponent: () =>
      import('./pages/registroarticulos/registroarticulos.page')
        .then(m => m.RegistroarticulosPage)
  },
  {
    path: 'articulos-registrados',
    loadComponent: () =>
      import('./pages/articulos-registrados/articulos-registrados.page')
        .then(m => m.ArticulosRegistradosPage)
  },
  {
    path: 'chat-ia',
    component: ChatIaComponent
  },
  {
    path: 'rick-morty-ep',
    component: RickMortyEpComponent
  },
  {
    path: 'rick-morty-graphql',
    loadComponent: () =>
      import('./pages/rick-morty-graphql/rick-morty-graphql.component')
        .then(m => m.RickMortyGraphqlComponent)
  },
  {
    path: 'media-permisos',
    loadComponent: () =>
      import('./pages/media-permisos/media-permisos.page')
        .then(m => m.MediaPermisosPage)
  },

];
