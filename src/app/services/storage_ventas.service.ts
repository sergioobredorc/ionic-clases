import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

export type Listado = {
    nombreArticulo: string;
    precioArticulo: number;
    categoriaArticulo: string;
    fechaIngreso: string;
    disponibilidadArticulo: boolean;
    descripcionArticulo: string;
    createdAt: string;
}

@Injectable({ providedIn: 'root'})
export class StorageVentasService{
    private _storage?: Storage;
    private readonly KEY = 'registros_articulos';

    constructor(private storage: Storage){}

    async init(): Promise<void>{
        if (this._storage) return;
        this._storage = await this.storage.create();
    }

    async addRegistro(data: Omit<Listado, 'createdAt'>): Promise<void>{
        await this.init();
        const registros = (await this._storage!.get(this.KEY)) as Listado[] | null;

        const nuevo: Listado = {
            ...data,
            createdAt: new Date().toISOString()
        };

        const actualizados = registros ? [nuevo,...registros] : [nuevo];
        await this._storage?.set(this.KEY,actualizados)
    }

    async getListadoArticulos(): Promise<Listado[]>{
        await this.init();
        return ((await this._storage!.get(this.KEY)) as Listado[] | null) ?? [];
    }

    async clearListadoArticulos(): Promise<void>{
        await this.init();
        await this._storage!.remove(this.KEY);
    }

}