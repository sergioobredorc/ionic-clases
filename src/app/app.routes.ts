import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
<<<<<<< HEAD
    redirectTo: 'chat',
    pathMatch: 'full',
  },
  {
    path: 'chat',
    loadComponent: () =>
      import('./pages/chat/chat.page').then(m => m.ChatPage),
  },
];
=======
    redirectTo: 'registro',
    pathMatch: 'full'
  },
  {
    path: 'registro',
    loadComponent: () =>
      import('./registro/registro.page').then(m => m.RegistroPage)
  },
  {
    path: 'listado',
    loadComponent: () =>
      import('./listado/listado.page').then(m => m.ListadoPage)
  }
];
>>>>>>> d7a3f18 (Actividad 2: registro y listado con Ionic Storage)
