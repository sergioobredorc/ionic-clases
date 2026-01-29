import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { GaleriaComponent } from './pages/galeria/galeria.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { ListadoRegistrosComponent } from './pages/listado-registros/listado-registros.component';
import { RegistroArticulosComponent } from './pages/registro-articulos/registro-articulos.component';
import { ListadoArticulosComponent } from './pages/listado-articulos/listado-articulos.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'perfil',
    component: PerfilComponent,
  },
  {
    path: 'galeria',
    component: GaleriaComponent,
  },
  {
    path: 'registro',
    component: RegistroComponent,
  },
  {
    path: 'registros',
    component: ListadoRegistrosComponent,
  },
  {
    path: 'articulo',
    component: RegistroArticulosComponent,
  },
  {
    path: 'listados',
    component: ListadoArticulosComponent,
  },
  {
    path: 'open',
    loadComponent: () =>
      import('./pages/chats/chats.page').then((m) => m.ChatsPage),
  },
  {
    path: 'rick&morty',
    loadComponent: () =>
      import('./pages/rm-graphql/rm-graphql.page').then((m) => m.RmGraphqlPage),
  },
  {
    path: 'actividad5',
    loadComponent: () =>
      import('./pages/actividad5/actividad5.page').then(
        (m) => m.Actividad5Page,
      ),
  },  {
    path: 'map',
    loadComponent: () => import('./pages/map/map.page').then( m => m.MapPage)
  },

];
