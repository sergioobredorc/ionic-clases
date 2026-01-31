import { Component } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { GraphqlService } from '../../services/graphql.service';
import { DetallePersonajeComponent } from '../../components/detalle-personaje/detalle-personaje.component';

@Component({
  standalone: true,
  selector: 'app-personajes',
  templateUrl: './personajes.page.html',
  imports: [IonicModule, CommonModule],
})
export class PersonajesPage {

  personajes: any[] = [];
  cargando = true;
  error: string | null = null;

  constructor(
    private gql: GraphqlService,
    private modalCtrl: ModalController
  ) {}

  async ngOnInit() {
    this.cargando = true;
    try {
      this.personajes = await this.gql.getPersonajes();
      if (!this.personajes || this.personajes.length === 0) this.error = 'No se encontraron personajes.';
    } catch (e: any) {
      this.error = e?.message || 'Error al cargar personajes';
    } finally {
      this.cargando = false;
    }
  }

  async abrirDetalle(id: string) {
    const modal = await this.modalCtrl.create({
      component: DetallePersonajeComponent,
      componentProps: { personajeId: id },
      breakpoints: [0.25, 0.5, 0.9],
      initialBreakpoint: 0.7,
    });
    await modal.present();
  }
}
