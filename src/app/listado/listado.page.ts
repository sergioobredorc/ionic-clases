import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { StorageService } from '../services/storage.service';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-listado',
  templateUrl: './listado.page.html',
  styleUrls: ['./listado.page.scss'],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ]
})
export class ListadoPage {

  articulos: any[] = [];

  constructor(private storageService: StorageService) {}

  ionViewWillEnter() {
    this.cargarArticulos();
  }

  async cargarArticulos() {
    this.articulos = await this.storageService.getArticulos();
  }

  async borrarTodo() {
    await this.storageService.clearArticulos();
    this.articulos = [];
  }
}
