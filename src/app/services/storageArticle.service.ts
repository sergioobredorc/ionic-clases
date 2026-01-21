import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage-angular";

export type Article = {
    name: string;
    price: number;
    category: string;
    dateOfAdmission: string;
    isActive: boolean;
    description: string;
    sure: boolean;
    createdAt: string;
}

@Injectable({ providedIn: 'root'})
export class StorageArticleService{
    private _storage?: Storage;
    private readonly KEY = 'articles';

    constructor(private storage: Storage){}

    async init(): Promise<void>{
        if (this._storage) return;
        this._storage = await this.storage.create();
    }

    async addArticles(data: Omit<Article, 'createdAt'>): Promise<void>{
        await this.init();
        const articles = (await this._storage!.get(this.KEY)) as Article[] | null;

        const nuevo: Article = {
            ...data,
            createdAt: new Date().toISOString()
        };

        const actualizados = articles ? [nuevo,...articles] : [nuevo];
        await this._storage?.set(this.KEY,actualizados)
    }

    async getArticles(): Promise<Article[]>{
        await this.init();
        return ((await this._storage!.get(this.KEY)) as Article[] | null) ?? [];
    }

    async clearArticles(): Promise<void>{
        await this.init();
        await this._storage!.remove(this.KEY);
    }
}