import { Component } from '@angular/core';
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
} from '@ionic/angular/standalone';

import { AlertController } from '@ionic/angular';
import { ArticulosStorageService } from 'src/app/services/articulos-storage';

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
    IonText,
  ]
})
export class ListadoArticulosComponent {

  articulos: any[] = [];
  cargando = true;

  constructor(
    private storageSvc: ArticulosStorageService,
    private alertCtrl: AlertController
  ) {}

  async ngOnInit() {
    await this.cargarArticulos();
  }

  async cargarArticulos() {
    this.cargando = true;
    this.articulos = await this.storageSvc.getArticulos();
    this.cargando = false;
  }

  async confirmarBorrado() {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar eliminación',
      message: '¿Deseas borrar todos los artículos registrados?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Borrar',
          role: 'destructive',
          handler: async () => {
            await this.borrarTodo();
          }
        }
      ]
    });

    await alert.present();
  }

  async borrarTodo() {
    this.cargando = true;
    await this.storageSvc.clearArticulos();
    this.articulos = [];
    this.cargando = false;
  }
}