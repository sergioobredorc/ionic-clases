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

import { Registro, StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-listado-registros',
  templateUrl: './listado-registros.component.html',
  styleUrls: ['./listado-registros.component.scss'],
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
export class ListadoRegistrosComponent  implements OnInit {
  registros: Registro[] = [];
  cargando = true;

  constructor(
    private storageSvc: StorageService,
    private alertController: AlertController
  ) { }

  async ngOnInit() {
    await this.cargar();
  }

  async cargar(){
    this.cargando = true;
    this.registros = await this.storageSvc.getRegistros();
    this.cargando = false;
  }

  async borrarTodo(){
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Desea borrar todos los registros?',
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
            await this.storageSvc.clearRegistros();
            await this.cargar();
          }
        }
      ]
    });
    await alert.present();
  }
}
