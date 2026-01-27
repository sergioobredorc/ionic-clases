import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';


export interface Articulo {
  nombre: string;
  precio: number;
  categoria: string;
  fecha: string;
  activo: boolean;
  descripcion: string;
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }


  async addArticle(articulo: Articulo) {
    const articulos = (await this._storage?.get('articulos')) || [];
    articulos.push(articulo);
    return this._storage?.set('articulos', articulos);
  }

 
  async getArticles(): Promise<Articulo[]> {
    return (await this._storage?.get('articulos')) || [];
  }


  async clearArticles() {
    return this._storage?.remove('articulos');
  }
}