import { Routes } from '@angular/router';
<<<<<<< HEAD

export const routes: Routes = [
  
  { path: '', redirectTo: 'registro-articulo', pathMatch: 'full' },


  { 
    path: 'registro-articulo', 
    loadComponent: () => import('./pages/registro/registro.component').then(m => m.RegistroArticuloComponent) 
  },

 
  { 
    path: 'listado-articulos', 
    loadComponent: () => import('./pages/listado-registros/listado-registros.component').then(m => m.ListadoRegistrosComponent) 
  },


  { path: '**', redirectTo: 'registro-articulo' }
=======
import { HomeComponent } from './pages/home/home.component';
import { RegistroArticuloComponent } from './pages/registro/registro.component';
import { ListadoRegistrosComponent } from './pages/listado-registros/listado-registros.component';

export const routes: Routes = [
  
  {
    path: '',
    component: HomeComponent
  },

  {
    path: 'registro',
    component: RegistroArticuloComponent
  },

  {
    path: 'listado-articulos',
    component: ListadoRegistrosComponent
  },
  {
    path: 'chat',
    loadComponent: () => import('./pages/chat/chat.page').then( m => m.ChatPage)
  },

>>>>>>> 70de455 (Actividad 3)
];