import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

export interface Registro {
  id?: number;
  nombre?: string;
  correo?: string;
  pais?: string;
  fechaNacimiento?: string | null;
  genero?: string | null;
  notificaciones?: boolean;
  biografia?: string | null;
  terminos?: boolean;
  createdAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;
  private readonly KEY = 'registros';

  constructor(private storage: Storage) {
    this.init();
  }

  private async init() {
    const s = await this.storage.create();
    this._storage = s;
    const existing = await this._storage.get(this.KEY);
    if (!existing) {
      await this._storage.set(this.KEY, []);
    }
  }

  async addRegistro(registro: Registro) {
    if (!this._storage) await this.init();
    const list: Registro[] = (await this._storage!.get(this.KEY)) || [];
    const item = { ...registro, id: new Date().getTime(), createdAt: new Date().toISOString() } as Registro;
    list.push(item);
    await this._storage!.set(this.KEY, list);
  }

  async getRegistros(): Promise<Registro[]> {
    if (!this._storage) await this.init();
    return (await this._storage!.get(this.KEY)) || [];
  }

  async clearRegistros() {
    if (!this._storage) await this.init();
    await this._storage!.set(this.KEY, []);
  }
}
