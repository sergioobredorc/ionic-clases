import { Component, OnInit } from '@angular/core';
import { IonicModule, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { StorageService, Registro } from '../../services/storage.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  mostrarListado = false;
  registros: Registro[] = [];

  constructor(
    private storageSvc: StorageService,
    private alertCtrl: AlertController
  ) {}

  async ngOnInit() {
    this.registros = await this.storageSvc.getRegistros();
  }

  async confirmarEliminar(index: number) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar',
      message: '¿Desea eliminar este usuario?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: async () => {
            await this.storageSvc.deleteRegistro(index);
            this.registros = await this.storageSvc.getRegistros();
          }
        }
      ]
    });

    await alert.present();
  }
}
