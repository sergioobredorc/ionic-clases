import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, delay } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiAnalisisService {
  constructor(private http: HttpClient) {}

  analizarSentimiento(texto: string) {
    const mockResponse = {
      label: texto.length > 20 ? 'POSITIVO' : 'NEUTRAL',
      score: Math.floor(Math.random() * 100)
    };
    return of(mockResponse).pipe(delay(1000));
  }
}