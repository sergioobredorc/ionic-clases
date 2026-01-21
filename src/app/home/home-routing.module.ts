import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // 👈 Importaciones primero

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () =>
      import('./pages/list/list.module').then(m => m.ListArticulosPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // 👈 Se inicializa el router con las rutas
  exports: [RouterModule]
})
export class AppRoutingModule {}
