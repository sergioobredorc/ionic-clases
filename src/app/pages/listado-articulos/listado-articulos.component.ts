import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
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
  IonAlert,
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { StorageService, Articulo } from 'src/app/service/storage2.service';

@Component({
  selector: 'app-listado-articulos',
  templateUrl: './listado-articulos.component.html',
  styleUrls: ['./listado-articulos.component.scss'],
  standalone: true,
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
    IonAlert,
  ],
})
export class ListadoArticulosComponent implements OnInit {
  articulos: Articulo[] = [];
  cargando = true;
  constructor(private storageSvs: StorageService) {}

  async ngOnInit() {
    await this.cargar();
  }

  async ionViewWillEnter() {
    await this.cargar();
  }

  async cargar() {
    this.cargando = true;
    this.articulos = await this.storageSvs.getArticulos();
    this.cargando = false;
  }

  alertButtons = [
    {
      text: 'No',
      role: 'cancel',
    },
    {
      text: 'Sí',
      role: 'confirm',
      cssClass: 'alert-confirm',
      handler: async () => {
        this.cargando = true;
        await this.storageSvs.clearArticulos();
        await this.cargar();
      },
    },
  ];
}
