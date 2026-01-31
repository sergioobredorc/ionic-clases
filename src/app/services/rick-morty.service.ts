import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RickMortyService {

  private API_URL = 'https://rickandmortyapi.com/graphql';

  constructor(private http: HttpClient) {}

  // QUERY 1 = Lista de los episodios
  getEpisodes() {
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

    return this.http.post<any>(this.API_URL, { query });
  }

  // QUERY 2: Detalle del episodio + los personajes
  getEpisodeDetail(id: string) {
    const query = `
      query ($id: ID!) {
        episode(id: $id) {
          name
          episode
          air_date
          characters {
            name
            image
            status
            species
          }
        }
      }
    `;

    /* 
    Bueno profesor para la query compleja lo que hice fue que recibiera un id del episodio como una variable. En la consulta se solicitan únicamente los campos necesarios que usted pidió y la relación que los campos tienen con los personajes, por ejemplo el nombre, imagen, estado, etc todo con el fin de que esté bien optimizado y los tiempos de cargan no sean tan largos :) 
    */

    return this.http.post<any>(this.API_URL, {
      query,
      variables: { id }
    });
  }
}
