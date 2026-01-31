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

  query<T>(query: string, variables?: Record<string, any>): Observable<GqlResponse<T>> {
    return this.http.post<GqlResponse<T>>(this.endpoint, {
      query,
      variables,
    });
  }
}



export interface Episode {
  id: string;
  name: string;
  air_date: string;
  episode: string;
}

export interface EpisodesResponse {
  episodes: {
    info: {
      count: number;
      pages: number;
      next: number | null;
      prev: number | null;
    };
    results: Episode[];
  };
}

@Injectable({ providedIn: 'root' })
export class RickMortyEpisodesGqlService {
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

  getEpisodes(page: number = 1) {
    const query = `
      query ($page: Int) {
        episodes(page: $page) {
          info {
            count
            pages
            next
            prev
          }
          results {
            id
            name
            air_date
            episode
          }
        }
      }
    `;

    return this.query<EpisodesResponse>(query, { page });
  }
}