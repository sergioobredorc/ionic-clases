import { Routes } from '@angular/router';

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
];