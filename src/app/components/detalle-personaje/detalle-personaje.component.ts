import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalController, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonSpinner, IonGrid, IonRow, IonCol, IonImg } from '@ionic/angular/standalone';
import { GraphqlService } from '../../services/graphql.service';

@Component({
  standalone: true,
  selector: 'app-detalle-personaje',
  templateUrl: './detalle-personaje.component.html',
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonSpinner, IonGrid, IonRow, IonCol, IonImg]
})
export class DetallePersonajeComponent implements OnInit {
  @Input() personajeId!: string;

  personaje: any = null;
  cargando = true;

  constructor(private gql: GraphqlService, private modalCtrl: ModalController) {}

  async ngOnInit() {
    this.cargando = true;
    try {
      this.personaje = await this.gql.getDetallePersonaje(this.personajeId);
    } finally {
      this.cargando = false;
    }
  }

  cerrar() {
    this.modalCtrl.dismiss();
  }
}
