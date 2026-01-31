import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url =
    'https://api-inference.huggingface.co/models/cardiffnlp/twitter-roberta-base-sentiment';

  constructor(private http: HttpClient) {}

  analizarTexto(texto: string) {
  return this.http.post<any>(
    'https://jsonplaceholder.typicode.com/posts',
    {
      descripcion: texto
    }
  );
}

}