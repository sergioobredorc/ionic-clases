import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RespuestaGraphQL<T> {
  data: T;
  characters: {
    results: any[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class RickMortyGqlService {

  private readonly URL_API = 'https://rickandmortyapi.com/graphql';

  constructor(private clienteHttp: HttpClient) {}

  ejecutarConsulta<T>(query: string, vars: any = {}): Observable<RespuestaGraphQL<T>> {
    const cuerpoPeticion = {
      query: query,
      variables: vars
    };
    
    return this.clienteHttp.post<RespuestaGraphQL<T>>(this.URL_API, cuerpoPeticion);
  }
}

/**
 * Para resolver la consulta compleja, utilicé una query de GraphQL que aprovecha las relaciones del esquema de Rick and Morty. En lugar de hacer dos peticiones separadas, solicité dentro del objeto episode el arreglo de characters. Decidí incluir únicamente los campos básicos del episodio (nombre, fecha y código) y para los personajes solo traje la imagen, nombre, especie y estado, cumpliendo así con la optimización de datos que permite GraphQL al no solicitar información innecesaria como la ubicación o el origen de los personajes en esta vista
 */