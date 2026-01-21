import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router'; 

import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardSubtitle, IonCardContent, IonButton, IonText, IonCardTitle, IonAlert} from '@ionic/angular/standalone';

import { StorageService, Registro} from '../../services/storage.service';

@Component({
  selector: 'app-listado-registros',
  templateUrl: './listado-registros.component.html',
  styleUrls: ['./listado-registros.component.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardSubtitle, IonCardContent, IonButton, IonText, CommonModule, RouterLink, DatePipe, IonCardTitle, IonAlert],
})
export class ListadoRegistrosComponent  implements OnInit {
  registros: Registro[] = [];
  cargando = true;
  alertButtons = [
    {
      text: "cancelar",
      role: "cancel",
    },
    {
      text: "Confirmar",
      handler: () =>{
        this.borrarTodo();
      }
    }
  ];
  constructor( private storageService: StorageService) { }

  async ngOnInit() {
    await this.cargar();
  }

  async cargar(){
    this.cargando = true;
    this.registros = await this.storageService.getRegistros();
    this.cargando = false;
  }

  

  async borrarTodo(){
    
    await this.storageService.clearRegistros();
    await this.cargar();
  }
}