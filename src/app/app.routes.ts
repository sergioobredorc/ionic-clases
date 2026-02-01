import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { GaleriaComponent } from './pages/galeria/galeria.component';

import { RegistroComponent } from './pages/registro/registro.component';
import { ListadoRegistrosComponent } from './pages/listado-registros/listado-registros.component';

import { RegistroArticulosComponent } from './pages/registro-articulos/registro-articulos.component';
import { ListadoArticulosComponent } from './pages/listado-articulos/listado-articulos.component';

import { ChatComponent } from './pages/chat/chat.component';

import { EpisodiosPage } from './pages/episodios/episodios.page';
import { PersonajesPage } from './pages/personajes/personajes.page';

import { CapturaComponent } from './pages/captura/captura.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },

  // Básicas
  { path: 'perfil', component: PerfilComponent },
  { path: 'galeria', component: GaleriaComponent },

  // Registros
  { path: 'registro', component: RegistroComponent },
  { path: 'registros', component: ListadoRegistrosComponent },

  // Artículos
  { path: 'registro-articulos', component: RegistroArticulosComponent },
  { path: 'articulos', component: ListadoArticulosComponent },

  // Rick & Morty (GraphQL)
  { path: 'episodios', component: EpisodiosPage },
  { path: 'personajes', component: PersonajesPage },

  // Media Capture
  { path: 'media-capture', component: CapturaComponent },

  // Chat IA
  { path: 'chat', component: ChatComponent }
];
