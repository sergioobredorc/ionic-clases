import { Routes } from '@angular/router';
import { ArticulosComponent } from './pages/articulos/articulos.component';
import { LsArticulosComponent } from './pages/ls-articulos/ls-articulos.component';

export const routes: Routes = [
  { path: '', redirectTo: 'articulos', pathMatch: 'full' },
  { path: 'articulos', component: ArticulosComponent },
  { path: 'ls-articulos', component: LsArticulosComponent }
];
