import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegistroArticuloComponent } from './pages/registro/registro.component';
import { ListadoRegistrosComponent } from './pages/listado-registros/listado-registros.component';
import { RegistroUsuarioComponent } from './pages/registro-usuario/registro-usuario.component';
import { ListadoUsuariosComponent } from './pages/listado-usuarios/listado-usuarios.component';

export const routes: Routes = [

  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'registro-usuario',
    component: RegistroUsuarioComponent
  },
  {
    path: 'listado-usuarios',
    component: ListadoUsuariosComponent
  },
  
  {
    path: 'registro-articulo',
    component: RegistroArticuloComponent
  },

  {
    path: 'listado-articulos',
    component: ListadoRegistrosComponent
  },

  {
    path: 'chat',
    loadComponent: () => import('./pages/chat/chat.page').then(m => m.ChatPage)
  },
  {
    path: 'rm-graphql',
    loadComponent: () => import('./pages/rm-graphql/rm-graphql.page').then( m => m.RmGraphqlPage)
  },
  {
    path: 'episodios',
    loadComponent: () => import('./pages/episodios/episodios.page').then( m => m.EpisodiosPage)
  },
  {
    path: 'camaraymicro',
    loadComponent: () => import('./pages/camaraymicro/camaraymicro.page').then( m => m.CamaraymicroPage)
  },



];