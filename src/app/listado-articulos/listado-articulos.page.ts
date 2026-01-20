import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { Articulo, ServiceArticulos } from '../services/service-articulos';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-listado-articulos',
  templateUrl: './listado-articulos.page.html',
  styleUrls: ['./listado-articulos.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, RouterModule]
})
export class ListadoArticulosPage implements OnInit {
  registros: Articulo[] = [];
  cargando = true;
  constructor(private servicesArticulos: ServiceArticulos, private alertCtrl: AlertController) { }

  async ngOnInit() {
    await this.cargar();
  }

  //espero me arregle el bug :,v
  async ionViewWillEnter() { 
    await this.cargar(); 
  }

  async cargar(){
    this.cargando = true;
    this.registros = await this.servicesArticulos.getRegistros();
    this.cargando = false;
  }

  async borrarTodo(){
    this.cargando = true;
    await this.servicesArticulos.clearRegistros();
    await this.cargar();
  }

  async borrarUno(index: number) {
  const registros = await this.servicesArticulos.getRegistros();
  registros.splice(index, 1); // elimina el artículo en esa posición
  await this.servicesArticulos.clearRegistros(); // limpia storage
  await this.servicesArticulos.addRegistroBatch(registros); // guarda el array actualizado
  await this.cargar(); // recarga la lista
}

async confirmarAccion(tipo: 'uno' | 'todos', index?: number) {
  const alert = await this.alertCtrl.create({
    header: 'Confirmar eliminación',
    message: tipo === 'uno' 
      ? '¿Seguro que deseas eliminar este artículo?' 
      : '¿Seguro que deseas borrar todos los artículos?',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel'
      },
      {
        text: tipo === 'uno' ? 'Eliminar' : 'Eliminar todos',
        role: 'destructive',
        handler: async () => {
          if (tipo === 'uno' && index !== undefined) {
            // Eliminar solo uno
            const registros = await this.servicesArticulos.getRegistros();
            registros.splice(index, 1);
            await this.servicesArticulos.clearRegistros();
            await this.servicesArticulos.addRegistroBatch(registros);
          } else {
            // Eliminar todos
            await this.servicesArticulos.clearRegistros();
          }
          await this.cargar();
        }
      }
    ]
  });

  await alert.present();
}
}
