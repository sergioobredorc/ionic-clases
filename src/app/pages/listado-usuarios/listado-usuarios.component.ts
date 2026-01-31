import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import type { OverlayEventDetail } from '@ionic/core';
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

import { Registro, StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.scss'],
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

  ]
})
export class ListadoUsuariosComponent  implements OnInit {
  registros: Registro[] = [];
  cargando = true;
  public alertButtons = [
    { 
      text: 'Cancelar',
      role: 'cancel',
      handler: () => {
        console.log('Alerta cancelada');
      },
    },
    {
      text: 'Si',
      role: 'confirm',
      handler: () => {
        this.borrarTodo();
      },
    },
  ];
  setResult(event: CustomEvent<OverlayEventDetail>) {
    console.log(`Execute with role: ${event.detail.role}`);
  }
  constructor(private storageSvc: StorageService) { }

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
}
