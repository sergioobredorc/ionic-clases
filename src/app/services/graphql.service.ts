import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GraphqlService {
  private url = 'https://rickandmortyapi.com/graphql';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  async getEpisodios(page = 1): Promise<any[]> {
    const query = `
      query ($page: Int) {
        episodes(page: $page) {
          results {
            id
            name
            episode
            air_date
          }
        }
      }
    `;

    const body = { query, variables: { page } };
    const res: any = await firstValueFrom(this.http.post(this.url, body, { headers: this.headers }));
    return res?.data?.episodes?.results ?? [];
  }

  async getDetalleEpisodio(id: string): Promise<any> {
    const query = `
      query ($id: ID!) {
        episode(id: $id) {
          id
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

    const body = { query, variables: { id } };
    const res: any = await firstValueFrom(this.http.post(this.url, body, { headers: this.headers }));
    return res?.data?.episode ?? null;
  }

  async getPersonajes(page = 1): Promise<any[]> {
    const query = `
      query ($page: Int) {
        characters(page: $page) {
          results {
            id
            name
            status
            species
            image
          }
        }
      }
    `;

    const body = { query, variables: { page } };
    const res: any = await firstValueFrom(this.http.post(this.url, body, { headers: this.headers }));
    return res?.data?.characters?.results ?? [];
  }

  async getDetallePersonaje(id: string): Promise<any> {
    const query = `
      query ($id: ID!) {
        character(id: $id) {
          id
          name
          status
          species
          image
          gender
          origin { name }
          location { name }
        }
      }
    `;

    const body = { query, variables: { id } };
    const res: any = await firstValueFrom(this.http.post(this.url, body, { headers: this.headers }));
    return res?.data?.character ?? null;
  }
}
