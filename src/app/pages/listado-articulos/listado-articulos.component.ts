import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonText, IonIcon, AlertController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { trash } from 'ionicons/icons';

import { Articulo, ArticulosService } from '../../services/articulos.service';

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
    IonText,
    IonIcon
  ]
})
export class ListadoArticulosComponent implements OnInit {
  articulos: Articulo[] = [];
  cargando = true;

  constructor(
    private articulosSvc: ArticulosService,
    private alertController: AlertController
  ) {
    addIcons({ trash });
  }

  async ngOnInit() {
    await this.cargar();
  }

  async cargar() {
    this.cargando = true;
    this.articulos = await this.articulosSvc.getArticulos();
    this.cargando = false;
  }

  async borrarTodo() {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Desea borrar todos los artículos?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Borrar',
          role: 'destructive',
          handler: async () => {
            this.cargando = true;
            await this.articulosSvc.clearArticulos();
            await this.cargar();
          }
        }
      ]
    });
    await alert.present();
  }

  async borrarArticulo(id: string | undefined) {
    if (!id) return;

    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Desea borrar este artículo?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Borrar',
          role: 'destructive',
          handler: async () => {
            this.cargando = true;
            await this.articulosSvc.deleteArticulo(id);
            await this.cargar();
          }
        }
      ]
    });
    await alert.present();
  }

  getCategoriaLabel(categoriaId: string): string {
    const categorias: { [key: string]: string } = {
      'electronica': 'Electrónica',
      'ropa': 'Ropa',
      'alimentos': 'Alimentos',
      'libros': 'Libros',
      'otros': 'Otros'
    };
    return categorias[categoriaId] || categoriaId;
  }
}
