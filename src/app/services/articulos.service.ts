import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {

  private _storage: Storage | null = null;
  private ARTICULOS_KEY = 'articulos';

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async guardarArticulo(articulo: any) {
    const articulos = await this.obtenerArticulos();
    articulos.push(articulo);
    await this._storage?.set(this.ARTICULOS_KEY, articulos);
  }

  async obtenerArticulos(): Promise<any[]> {
    return (await this._storage?.get(this.ARTICULOS_KEY)) || [];
  }

  async limpiarArticulos() {
    await this._storage?.remove(this.ARTICULOS_KEY);
  }
  async eliminarArticulo(index: number) {
    const articulos = await this.obtenerArticulos();
    articulos.splice(index, 1);
    await this._storage?.set(this.ARTICULOS_KEY, articulos);
  }


}
