import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

export type Articulo = {
  nombre: string;
  precio: number;
  categoria: string;
  fecha: string;
  disponibilidad: boolean;
  descripcion: string;
}


@Injectable({
  providedIn: 'root',
})
export class ServiceArticulos {
  private _storage?: Storage;
  private readonly KEY = 'registrosArticulos';

    constructor(private storage: Storage){}

    async init(): Promise<void>{
        if (this._storage) return;
        this._storage = await this.storage.create();
    }

    async addRegistro(data: Omit<Articulo, 'createdAt'>): Promise<void>{
        await this.init();
        const registros = (await this._storage!.get(this.KEY)) as Articulo[] | null;

        const nuevo: Articulo = {
            ...data,
            fecha: new Date().toISOString()
        };

        const actualizados = registros ? [nuevo,...registros] : [nuevo];
        await this._storage?.set(this.KEY,actualizados)
    }

    async getRegistros(): Promise<Articulo[]>{
        await this.init();
        return ((await this._storage!.get(this.KEY)) as Articulo[] | null) ?? [];
    }

    async clearRegistros(): Promise<void>{
        await this.init();
        await this._storage!.remove(this.KEY);
    }

  async addRegistroBatch(data: Articulo[]): Promise<void> {
    await this.init();
    await this._storage?.set(this.KEY, data);
  }

}

