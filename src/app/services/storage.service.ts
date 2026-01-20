import { Injectable } from '@angular/core';
<<<<<<< HEAD
=======
import { Storage } from '@ionic/storage-angular';
>>>>>>> d7a3f18 (Actividad 2: registro y listado con Ionic Storage)

@Injectable({
  providedIn: 'root'
})
export class StorageService {

<<<<<<< HEAD
  save(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  get<T>(key: string): T | null {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
=======
  private _storage: Storage | null = null;
  private ARTICULOS_KEY = 'articulos';

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async getArticulos(): Promise<any[]> {
    return (await this._storage?.get(this.ARTICULOS_KEY)) || [];
  }

  async addArticulo(articulo: any) {
    const articulos = await this.getArticulos();
    articulos.push(articulo);
    await this._storage?.set(this.ARTICULOS_KEY, articulos);
  }

  async clearArticulos() {
    await this._storage?.remove(this.ARTICULOS_KEY);
>>>>>>> d7a3f18 (Actividad 2: registro y listado con Ionic Storage)
  }
}
