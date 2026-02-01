import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalisisSentimientosService {

  private readonly ENDPOINT_SENTIMIENTOS = '/api/api/v1/analisis';

  constructor(private clienteHttp: HttpClient) {}

  obtenerAnalisis(frase: string): Observable<any> {
    const cuerpo = {
      textoInput: frase,
      fechaConsulta: new Date().toISOString()
    };
    
    return this.clienteHttp.post(this.ENDPOINT_SENTIMIENTOS, cuerpo);
  }
}
