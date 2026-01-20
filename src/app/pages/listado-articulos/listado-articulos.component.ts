import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router'; 

import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardSubtitle, IonCardContent, IonButton, IonText, IonCardTitle, IonAlert} from '@ionic/angular/standalone';

import { StorageVentasService, Listado} from '../../services/storage_ventas.service';
@Component({
  selector: 'app-listado-articulos',
  templateUrl: './listado-articulos.component.html',
  styleUrls: ['./listado-articulos.component.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardSubtitle, IonCardContent, IonButton, IonText, CommonModule, RouterLink, DatePipe, IonCardTitle, IonAlert],
})
export class ListadoArticulosComponent  implements OnInit {
  listado_articulos: Listado[] = [];
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
  ]
  constructor(private Storage: StorageVentasService) { }

  async ngOnInit() {
    await this.cargar();
  }

  async cargar(){
    this.cargando = true;
    this.listado_articulos = await this.Storage.getListadoArticulos();
    this.cargando = false;
  }

  async borrarTodo(){
    
    await this.Storage.clearListadoArticulos();
    await this.cargar();
  }


}
