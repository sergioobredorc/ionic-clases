import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalController, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonSpinner, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle } from '@ionic/angular/standalone';
import { GraphqlService } from '../../services/graphql.service';

@Component({
  standalone: true,
  selector: 'app-detalle-episodio',
  templateUrl: './detalle-episodio.component.html',
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonContent,
    IonSpinner,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle
  ]
})
export class DetalleEpisodioComponent implements OnInit {

  @Input() episodioId!: string;

  episodio: any;
  cargando = true;

  constructor(
    private gql: GraphqlService,
    private modalCtrl: ModalController
  ) {}

  async ngOnInit() {
    this.episodio = await this.gql.getDetalleEpisodio(this.episodioId);
    this.cargando = false;
  }

  cerrar() {
    this.modalCtrl.dismiss();
  }
}
