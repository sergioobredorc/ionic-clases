import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {

  private apiUrl = 'https://rickandmortyapi.com/graphql';

  constructor(private http: HttpClient) {}

  // 🔹 Query 1: Lista de episodios
  async getEpisodios(): Promise<any[]> {
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

    const response: any = await firstValueFrom(
      this.http.post(this.apiUrl, { query })
    );

    return response.data.episodes.results;
  }

  // 🔹 Query 2: Detalle del episodio + personajes
  async getDetalleEpisodio(id: string): Promise<any> {
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

    const variables = { id };

    const response: any = await firstValueFrom(
      this.http.post(this.apiUrl, { query, variables })
    );

    return response.data.episode;
  }
}
