import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage-angular";

export type Registro = {
  nombre: string;
  correo: string;
  pais: string;
  genero: string;
  biografia: string;
}

export type Articulo = {
  nombre: string;
  precio: number;
  categoria: string;
  fechaIngreso: string;
  disponibilidad: boolean;
  descripcion: string;
}

@Injectable({ providedIn: 'root' })
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    if (this._storage) return;
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async addArticulo(articulo: Articulo) {
    await this.init();
    const actuales = await this.getArticulos();
    actuales.push(articulo);
    await this._storage?.set('mis_articulos', actuales);
  }

  async getArticulos(): Promise<Articulo[]> {
    await this.init();
    const datos = await this._storage?.get('mis_articulos');
    return datos || [];
  }

  async clearArticulos() {
    await this.init();
    await this._storage?.remove('mis_articulos');
  }

  async addRegistro(registro: Registro) {
    await this.init();
    const actuales = await this.getRegistros();
    actuales.push(registro);
    await this._storage?.set('registros', actuales);
  }

  async getRegistros(): Promise<Registro[]> {
    await this.init();
    const datos = await this._storage?.get('registros');
    return datos || [];
  }

  async clearRegistros() {
    await this.init();
    await this._storage?.remove('registros');
  }
}