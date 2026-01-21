import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController } from '@ionic/angular';
import { ArticulosService } from '../../services/articulos.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-articulos-registrados',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink],
  templateUrl: './articulos-registrados.page.html',
  styleUrls: ['./articulos-registrados.page.scss'],
})
export class ArticulosRegistradosPage {

  articulos: any[] = [];

  constructor(
    private articulosService: ArticulosService,
    private alertController: AlertController
  ) {}

  ionViewWillEnter() {
    this.cargarArticulos();
  }

  async cargarArticulos() {
    this.articulos = await this.articulosService.obtenerArticulos();
  }

  async borrarTodo() {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Estás seguro de que deseas borrar todos los artículos?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Borrar',
          role: 'destructive',
          handler: async () => {
            await this.articulosService.limpiarArticulos();
            this.articulos = [];
          }
        }
      ]
    });

    await alert.present();
  }
}
