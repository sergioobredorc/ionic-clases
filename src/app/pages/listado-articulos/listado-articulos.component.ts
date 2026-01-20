import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController } from '@ionic/angular';
import { StorageService, Articulo } from '../../services/storage.service';
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { trashOutline, add, cubeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-listado-articulos',
  standalone: true,
  templateUrl: './listado-articulos.component.html',
  imports: [IonicModule, CommonModule, RouterModule]
})
export class ListadoArticulosComponent {
  articulos: Articulo[] = [];

  constructor(
    private storageSvc: StorageService,
    private alertController: AlertController
  ) {
    addIcons({ trashOutline, add, cubeOutline });
  }

  async ionViewWillEnter() {
    this.articulos = await this.storageSvc.getArticulos();
  }

  async confirmarEliminacion() {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Estás seguro de que quieres borrar todos los artículos?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Sí, borrar',
          handler: async () => {
            await this.eliminarTodo();
          }
        }
      ]
    });

    await alert.present();
  }

  async eliminarTodo() {
    await this.storageSvc.clearArticulos();
    this.articulos = [];
  }
}