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
import { Articulo, StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-listado-articulos',
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
    private storageSvc: StorageService,
    private alertCtrl: AlertController
  ) {}

  async ngOnInit() {
    await this.cargar();
  }

  async cargar() {
    this.cargando = true;
    this.articulos = await this.storageSvc.getArticulos();
    this.cargando = false;
  }

  async confirmarBorrado() {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar',
      message: '¿Seguro que deseas borrar todos los artículos?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Sí, borrar', handler: async () => { await this.borrarTodo(); } }
      ]
    });

    await alert.present();
  }

  async borrarTodo() {
    this.cargando = true;
    await this.storageSvc.clearArticulos();
    await this.cargar();
  }
}
