import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IonText, AlertController } from '@ionic/angular/standalone';

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
 
} from '@ionic/angular/standalone';


import { StorageArticuloService, Articulo } from 'src/app/services/storageArticulo.service';

@Component({
  selector: 'app-listado-registros',
  templateUrl: './listado-registros.component.html',
  styleUrls: ['./listado-registros.component.scss'],
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
    IonText
  ]
})
export class ListadoRegistrosComponent implements OnInit {

  registros: Articulo[] = [];
  cargando = true;

  constructor(private storageSvc: StorageArticuloService, private alertCtrl: AlertController) { }

  async ngOnInit() {
    await this.cargar();
  }

  async cargar(){
    this.cargando = true;
    
    this.registros = await this.storageSvc.obtener(); 
    this.cargando = false;
  }

  async borrarTodo() {
  // Creamos la alerta de confirmación
  const alert = await this.alertCtrl.create({
    header: 'Confirmar',
    message: '¿Estás seguro de que deseas borrar todos los artículos?',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary'
      },
      {
        text: 'Sí, borrar',
        handler: async () => {
          // Esta lógica solo se ejecuta si el usuario presiona "Sí, borrar"
          this.cargando = true;
          await this.storageSvc.eliminarTodo(); //
          await this.cargar(); // Refresca la lista
        }
      }
    ]
  });

  await alert.present();

  }

}