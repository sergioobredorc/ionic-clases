//ARTICULOS
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';


export interface Articulo {
  nombre: string;
  precio: number;
  categoria: string;
  fechaIngreso: string;
  disponibilidad: boolean;
  descripcion: string;
}

@Injectable({
  providedIn: 'root'
})
export class StorageArticuloService {
  private _db: Storage | null = null;
  private readonly KEY_ARTICULOS = 'articulos_ventas';

  constructor(private storage: Storage) {
    this.iniciar();
  }


  async iniciar() {
    if (this._db) return;
    this._db = await this.storage.create();
  }


  async grabar(articulo: Articulo) {
    await this.iniciar();
    const actuales = await this.obtener() || [];
    actuales.push(articulo);
    await this._db?.set(this.KEY_ARTICULOS, actuales);
  }


  async obtener(): Promise<Articulo[]> {
    await this.iniciar();
    return (await this._db?.get(this.KEY_ARTICULOS)) || [];
  }


  async eliminarTodo() {
    await this.iniciar();
    await this._db?.remove(this.KEY_ARTICULOS);
  }

  
}