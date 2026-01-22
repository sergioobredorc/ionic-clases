import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

export interface Articulo {
  id?: string;
  nombre: string;
  precio: number;
  categoria: string;
  fechaIngreso: string;
  disponibilidad: boolean;
  descripcion: string;
  confirmacion: boolean;
  createdAt?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {
  private storage: Storage | null = null;
  private dbReady = false;
  private articulos: Articulo[] = [];
  private STORAGE_KEY = 'articulos';

  constructor(private ionicStorage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.ionicStorage.create();
    this.storage = storage;
    this.dbReady = true;
  }

  async addArticulo(articulo: Articulo) {
    if (!this.dbReady) await this.init();
    
    const id = Date.now().toString();
    const nuevoArticulo: Articulo = {
      ...articulo,
      id,
      createdAt: new Date()
    };

    this.articulos.push(nuevoArticulo);
    await this.storage?.set(this.STORAGE_KEY, this.articulos);
    return nuevoArticulo;
  }

  async getArticulos(): Promise<Articulo[]> {
    if (!this.dbReady) await this.init();
    
    const articulos = await this.storage?.get(this.STORAGE_KEY);
    return articulos || [];
  }

  async clearArticulos() {
    if (!this.dbReady) await this.init();
    
    this.articulos = [];
    await this.storage?.remove(this.STORAGE_KEY);
  }

  async deleteArticulo(id: string) {
    if (!this.dbReady) await this.init();
    
    const articulos = await this.getArticulos();
    const filtrados = articulos.filter(a => a.id !== id);
    await this.storage?.set(this.STORAGE_KEY, filtrados);
    return filtrados;
  }
}
