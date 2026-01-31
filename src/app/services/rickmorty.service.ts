import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class RickMortyService {

  private endpoint = 'https://rickandmortyapi.com/graphql';

  constructor(private http: HttpClient) {}

  // Query 1: listado de episodios
  getEpisodes(): Observable<any[]> {
    const query = `
      query {
        episodes {
          results {
            id
            name
            episode
            air_date
          }
        }
      }
    `;

    return this.http.post<any>(this.endpoint, { query }).pipe(
      map(res => res.data.episodes.results)
    );
  }

  // Query 2: detalle de episodio + personajes
  getEpisodeDetail(id: string): Observable<any> {
    const query = `
      query ($id: ID!) {
        episode(id: $id) {
          name
          episode
          air_date
          characters {
            id
            name
            status
            species
            image
          }
        }
      }
    `;

    return this.http.post<any>(this.endpoint, {
      query,
      variables: { id }
    }).pipe(
      map(res => res.data.episode)
    );
  }
}
