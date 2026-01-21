import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

export interface Articulo {
  nombre: string;
  precio: number;
  categoria: string;
  fecha: string;
}

@Injectable({
  providedIn: 'root',
})
export class ArticulosService {
  private storageKey = 'articulos';
  private _storage!: Storage;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    if (!this._storage) {
      this._storage = await this.storage.create();
    }
  }

  async getArticulos(): Promise<Articulo[]> {
    const articulos = await this._storage.get(this.storageKey);
    return articulos || [];
  }

  async addArticulo(articulo: Articulo) {
    const articulos = await this.getArticulos();

    articulos.push(articulo);
    await this._storage.set(this.storageKey, articulos);
  }

  async clearArticulos() {
    await this._storage.remove(this.storageKey);
  }
}
