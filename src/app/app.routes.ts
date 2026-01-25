import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'chat',
    pathMatch: 'full',
  },
  {
    path: 'chat',
    loadComponent: () =>
      import('./pages/chat/chat.page').then(m => m.ChatPage),
  },
];