import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { ArticulosService, Articulo } from '../../services/articulos.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class ListPage {

  articulos: Articulo[] = [];

  constructor(private articulosService: ArticulosService) {}

  async ionViewWillEnter() {
    this.articulos = await this.articulosService.getArticulos();
  }

  async limpiar() {
    await this.articulosService.clearArticulos();
    this.articulos = [];
  }
}
