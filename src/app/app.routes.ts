import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'media',
    pathMatch: 'full',
  },
  {
    path: 'media',
    loadComponent: () =>
      import('./pages/media/media.page').then(m => m.MediaPage),
  },
];
