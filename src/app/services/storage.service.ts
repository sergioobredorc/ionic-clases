import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private storageReady = false;
  private _storage!: Storage;
  private KEY = 'articulos';

  constructor(private storage: Storage) {}

  async init() {
    if (!this.storageReady) {
      this._storage = await this.storage.create();
      this.storageReady = true;
    }
  }

  async guardar(articulo:any){
    await this.init();
    const lista = await this.obtener();
    lista.push(articulo);
    await this._storage.set(this.KEY, lista);
  }

  async obtener(){
    await this.init();
    return await this._storage.get(this.KEY) || [];
  }

  async borrarTodo(){
    await this.init();
    await this._storage.remove(this.KEY);
  }
}
