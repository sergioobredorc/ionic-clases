import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage-angular";

export type RegistroArt = {
    nombre: string;
    precio: BigInteger;
    categoria: string;
    fechaIngreso: string;
    disponibilidad: boolean;
    descripcion: string;
    confirmacion: boolean;
    createdAt: string;
}

@Injectable({ providedIn: 'root' })

export class StorageArtService {
    private _storage?: Storage;
    private readonly KEY = 'registros-articulos';

    constructor(private storage: Storage) { }

    async init(): Promise<void> {
        if (this._storage) return;
        this._storage = await this.storage.create();
    }

    async addRegistro(data: Omit<RegistroArt, 'createdAt'>): Promise<void> {
        await this.init();
        const registros = (await this._storage!.get(this.KEY)) as RegistroArt[] | null;

        const nuevo: RegistroArt = {
            ...data,
            createdAt: new Date().toISOString()
        };

        const actualizados = registros ? [nuevo, ...registros] : [nuevo];
        await this._storage?.set(this.KEY, actualizados)
    }

     async getRegistros(): Promise<RegistroArt[]>{
            await this.init();
            return ((await this._storage!.get(this.KEY)) as RegistroArt[] | null) ?? [];
        }
    
        async clearRegistros(): Promise<void>{
            await this.init();
            await this._storage!.remove(this.KEY);
        }
}