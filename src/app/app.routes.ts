import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'episodes',
    pathMatch: 'full',
  },
  {
    path: 'episodes',
    loadComponent: () =>
      import('./pages/episodes-graphql/episodes-graphql.page')
        .then(m => m.EpisodesGraphqlPage),
  },
];
