import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSpinner, IonList, IonItem, IonLabel, ModalController } from '@ionic/angular/standalone';
import { GraphqlService } from '../../services/graphql.service';
import { DetalleEpisodioComponent } from '../../components/detalle-episodio/detalle-episodio.component';

@Component({
  standalone: true,
  selector: 'app-episodios',
  templateUrl: './episodios.page.html',
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonSpinner, IonList, IonItem, IonLabel, DetalleEpisodioComponent]
})
export class EpisodiosPage implements OnInit {

  episodios: any[] = [];
  cargando = true;
  error: string | null = null;

  constructor(
    private gql: GraphqlService,
    private modalCtrl: ModalController
  ) {}

  async ngOnInit() {
    this.cargando = true;
    try {
      this.episodios = await this.gql.getEpisodios();
      if (!this.episodios || this.episodios.length === 0) this.error = 'No se encontraron episodios.';
    } finally {
      this.cargando = false;
    }
  }

  async abrirDetalle(id: string) {
    const modal = await this.modalCtrl.create({
      component: DetalleEpisodioComponent,
      componentProps: { episodioId: id }
    });
    await modal.present();
  }
}
