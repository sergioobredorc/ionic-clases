import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {

  private storageReady = false;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
    this.storageReady = true;
  }

  async guardarArticulo(articulo: any) {
    if (!this.storageReady) return;

    const articulos = (await this.storage.get('articulos')) || [];
    articulos.push(articulo);
    await this.storage.set('articulos', articulos);
  }

  async obtenerArticulos() {
    return (await this.storage.get('articulos')) || [];
  }
}
