import { Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { HomeComponent } from './pages/home/home.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { GaleriaComponent } from './pages/galeria/galeria.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { ListadoRegistrosComponent } from './pages/listado-registros/listado-registros.component';
import { HomeComponent as SalesHomeComponent } from './pages/sales/home/home.component';
import { AddArticleComponent } from './pages/sales/add-article/add-article.component';
import { ArticlesComponent } from './pages/sales/articles/articles.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'actividad1',
    component: HomeComponent
  },
  {
    path: 'perfil',
    component: PerfilComponent
  },
  {
    path: 'galeria',
    component: GaleriaComponent
  },
  {
    path: 'registro',
    component: RegistroComponent
  },
  {
    path: 'registros',
    component: ListadoRegistrosComponent
  },
  {
    path: 'sales',
    component: SalesHomeComponent
  },
  {
    path: 'sales/addArticle',
    component: AddArticleComponent
  },
  {
    path: 'sales/articles',
    component: ArticlesComponent
  }
];
