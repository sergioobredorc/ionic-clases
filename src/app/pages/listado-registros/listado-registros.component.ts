import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AlertController } from '@ionic/angular';

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
  IonText
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
    IonText,
  ]
})
export class ListadoRegistrosComponent  implements OnInit {
  registros: Registro[] = [];
  cargando = true;

  constructor(private storageSvc: StorageService,
    private alertCtrl: AlertController
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
    this.cargando = true;
    await this.storageSvc.clearRegistros();
    await this.cargar();
  }

  async confirmarBorrado() {
  const alert = await this.alertCtrl.create({
    header: 'Confirmar eliminación',
    message: `Vas a eliminar ${this.registros.length} registros. ¿Deseas continuar?`,
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel'
      },
      {
        text: 'Sí, borrar',
        role: 'destructive',
        handler: async () => {
          await this.borrarTodo();
        }
      }
    ]
  });

  await alert.present();
}

}
