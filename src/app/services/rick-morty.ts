import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Response<T> {
    data?: T;
    errors?: { message: string }[];
}

@Injectable({ providedIn: 'root' })
export class RickMortyService {
    private endpoint = 'https://rickandmortyapi.com/graphql';

    constructor(private http: HttpClient) { }

    query<T>(query: string, variables?: Record<string, any>): Observable<Response<T>> {
        return this.http.post<Response<T>>(this.endpoint, {
            query,
            variables,
        });
    }
}