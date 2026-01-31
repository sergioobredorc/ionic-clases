import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface GqlResponse<T> {
  data?: T;
  errors?: { message: string }[];
}

@Injectable({ providedIn: 'root' })
export class RickMortyGqlService {

  private endpoint = 'https://rickandmortyapi.com/graphql';

  constructor(private http: HttpClient) {}

  query<T>(
    query: string,
    variables?: Record<string, any>
  ): Observable<GqlResponse<T>> {
    return this.http.post<GqlResponse<T>>(this.endpoint, {
      query,
      variables,
    });
  }

  
  getEpisodes(): Observable<GqlResponse<any>> {
    const query = `
      query {
        episodes(page: 1) {
          results {
            id
            name
            episode
            air_date
          }
        }
      }
    `;
    return this.query(query);
  }

  getEpisodeDetail(id: string): Observable<GqlResponse<any>> {
    const query = `
      query ($id: ID!) {
        episode(id: $id) {
          name
          episode
          air_date
          characters {
            name
            status
            species
            image
          }
        }
      }
    `;
    return this.query(query, { id });
  }
}
