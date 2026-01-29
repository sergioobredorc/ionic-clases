import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface GqlResponse<T> {
  data: T;
}

@Injectable({
  providedIn: 'root'
})
export class RickMortyService {

  private apiUrl = 'https://rickandmortyapi.com/graphql';

  constructor(private http: HttpClient) { }

  query<T>(query: string, variables: any = {}): Observable<GqlResponse<T>> {
    return this.http.post<GqlResponse<T>>(this.apiUrl, {
      query: query,
      variables: variables
    });
  }
}