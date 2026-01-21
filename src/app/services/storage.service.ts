import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage-angular";
import { BehaviorSubject } from "rxjs";

/* =========================
   MODELO REGISTROS USUARIO
========================= */
export type Registro = {
  nombre: string;
  correo: string;
  pais: string;
  fechaNacimiento: string;
  genero: string;
  notificaciones: boolean;
  biografia: string;
  terminos: boolean;
  createdAt: string;
};

/* =========================
   MODELO ARTÍCULOS
========================= */
export type Articulo = {
  nombre_articulo: string;
  precio: number;
  categoria: string;
  fechaIngreso: string;
  disponibilidad: string;
  descripcion?: string;
  createdAt: string;
};

@Injectable({ providedIn: 'root' })
export class StorageService {
  private _storage?: Storage;

  private readonly REGISTROS_KEY = 'registros';
  private readonly ARTICULOS_KEY = 'articulos';

  // Subjects para emitir cambios en tiempo real
  registros$ = new BehaviorSubject<Registro[]>([]);
  articulos$ = new BehaviorSubject<Articulo[]>([]);

  constructor(private storage: Storage) {}

  async init(): Promise<void> {
    if (this._storage) return;
    this._storage = await this.storage.create();

    // Inicializar valores en memoria reactiva
    this.registros$.next(await this.getRegistros());
    this.articulos$.next(await this.getArticulos());
  }

  /* =========================
     REGISTROS USUARIOS
  ========================= */

  async addRegistro(data: Omit<Registro, 'createdAt'>): Promise<void> {
    await this.init();
    const registros = await this.getRegistros();

    const nuevo: Registro = {
      ...data,
      createdAt: new Date().toISOString()
    };

    const actualizados = [nuevo, ...registros];
    await this._storage!.set(this.REGISTROS_KEY, actualizados);
    this.registros$.next(actualizados); // 🔔 Notificar cambio
  }

  async getRegistros(): Promise<Registro[]> {
    await this.init();
    return (await this._storage!.get(this.REGISTROS_KEY)) ?? [];
  }

  async clearRegistros(): Promise<void> {
    await this.init();
    await this._storage!.remove(this.REGISTROS_KEY);
    this.registros$.next([]); // 🔔 Vaciar lista en memoria
  }

  /* =========================
     ARTÍCULOS
  ========================= */

  async addArticulo(data: Omit<Articulo, 'createdAt'>): Promise<void> {
    await this.init();
    const articulos = await this.getArticulos();

    const nuevo: Articulo = {
      ...data,
      createdAt: new Date().toISOString()
    };

    const actualizados = [nuevo, ...articulos];
    await this._storage!.set(this.ARTICULOS_KEY, actualizados);
    this.articulos$.next(actualizados); // 🔔 Notificar cambio
  }

  async getArticulos(): Promise<Articulo[]> {
    await this.init();
    return (await this._storage!.get(this.ARTICULOS_KEY)) ?? [];
  }

  async clearArticulos(): Promise<void> {
    await this.init();
    await this._storage!.remove(this.ARTICULOS_KEY);
    this.articulos$.next([]); // 🔔 Vaciar lista en memoria
  }
}
