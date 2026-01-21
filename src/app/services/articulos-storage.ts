import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

export interface Articulo {
  nombre: string;
  precio: number;
  categoria: string;
  fechaIngreso: string;
  disponible: boolean;
  descripcion?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ArticulosStorageService {

  private storageReady = this.storage.create();
  private readonly KEY = 'articulos';

  constructor(private storage: Storage) {}

  async addArticulo(articulo: Articulo) {
    const articulos = await this.getArticulos();
    articulos.push(articulo);
    await this.storage.set(this.KEY, articulos);
  }

  async getArticulos(): Promise<Articulo[]> {
    return (await this.storage.get(this.KEY)) || [];
  }

  async clearArticulos() {
    await this.storage.remove(this.KEY);
  }
}
