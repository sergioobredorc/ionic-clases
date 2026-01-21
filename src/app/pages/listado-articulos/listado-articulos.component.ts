import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonText, IonButtons } from '@ionic/angular/standalone';
import { RegistroArticulo, StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-listado-articulos',
  standalone: true,
  templateUrl: './listado-articulos.component.html',
  styleUrls: ['./listado-articulos.component.scss'],
  imports: [IonButtons,  CommonModule, RouterLink, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonText
  ]
})
export class ListadoArticulosComponent  implements OnInit {
  articulos: RegistroArticulo[] = [];
  cargando = true;

  constructor(private storageService: StorageService, private alertController: AlertController) { }

  async ngOnInit() {
    await this.cargarArticulos();
  }

  async cargarArticulos(){
    this.cargando = true;
    this.articulos = await this.storageService.getRegistrosArticulos();
    this.cargando = false;
  }

  async borrarTodoArticulos(){
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Estás seguro de que deseas borrar todos los artículos?',
      buttons: [
        {
          text: 'Cancelar', role: 'cancel'
        },
        {
          text: 'Borrar',
          role: 'destructive',
          handler: async () => {
            this.cargando = true;
            await this.storageService.clearRegistrosArticulos();
            await this.cargarArticulos();
          }
        }
      ]
    });
    await alert.present();
  }
}