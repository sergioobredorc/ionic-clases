import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonText,
  AlertController
} from '@ionic/angular/standalone';

import { Articulo, ArticulosStorageService } from '../../services/articulos-storage.service';

@Component({
  selector: 'app-listado-articulos',
  standalone: true,
  templateUrl: './listado-articulos.component.html',
  styleUrls: ['./listado-articulos.component.scss'],
  imports: [
    CommonModule,
    DatePipe,
    RouterLink,

    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButton,
    IonText
  ]
})
export class ListadoArticulosComponent implements OnInit {

  articulos: Articulo[] = [];
  cargando = true;

  constructor(
    private articuloSvc: ArticulosStorageService,
    private alertCtrl: AlertController
  ) {}

  async ngOnInit() {
    await this.cargar();
  }

  async cargar() {
    this.cargando = true;
    this.articulos = await this.articuloSvc.getArticulos();
    this.cargando = false;
  }

  async confirmarBorrado() {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar',
      message: '¿Deseas eliminar todos los artículos?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: async () => {
            await this.articuloSvc.clearArticulos();
            await this.cargar();
          }
        }
      ]
    });

    await alert.present();
  }
}
