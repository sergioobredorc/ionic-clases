import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

export type Articulo = {
  nombre: string;
  precio: number;
  categoria: string;
  fechaIngreso: string;
  disponible: boolean;
  descripcion: string;
  createdAt: string;
};

@Injectable({
  providedIn: 'root'
})
export class ArticulosStorageService {

  private _storage?: Storage;
  private readonly KEY = 'articulos';

  constructor(private storage: Storage) {}

  async init(): Promise<void> {
    if (this._storage) return;
    this._storage = await this.storage.create();
  }

  async addArticulo(data: Omit<Articulo, 'createdAt'>): Promise<void> {
    await this.init();

    const articulos =
      (await this._storage!.get(this.KEY)) as Articulo[] | null;

    const nuevo: Articulo = {
      ...data,
      createdAt: new Date().toISOString()
    };

    const actualizados = articulos
      ? [nuevo, ...articulos]
      : [nuevo];

    await this._storage!.set(this.KEY, actualizados);
  }

  async getArticulos(): Promise<Articulo[]> {
    await this.init();
    return (
      (await this._storage!.get(this.KEY)) as Articulo[] | null
    ) ?? [];
  }

  async clearArticulos(): Promise<void> {
    await this.init();
    await this._storage!.remove(this.KEY);
  }
}
