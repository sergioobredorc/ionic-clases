import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SentimentService {

  constructor(private http: HttpClient) {}

  analyze(text: string) {

    const result = [
      [{
        label: text.toLowerCase().includes('bad') ? 'NEGATIVE' : 'POSITIVE',
        score: Math.random().toFixed(2)
      }]
    ];

    return of(result).pipe(delay(1500));
  }
}

// Bueno profe le explico inicialmente intenté hacer el consumo de la API directamente del navegador pero me salía una vaina y que restricción CORS que no dejaba consultar ni nada y bueno le pregunté a la IA acerca de eso y me decía que básicamente la propia API no permite hacer consultas directamente del navegador y bueno viendo que en la actividad se podía mas bien "simular" la API, eso fue lo que me tocó hacer