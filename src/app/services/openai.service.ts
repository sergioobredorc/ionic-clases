import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OpenAIService {

  constructor() {}

  // Respuesta simulada de IA (por límite de cuota API)
  ask(prompt: string): Observable<string> {
    return new Observable<string>(observer => {
      setTimeout(() => {
        observer.next(
          `🤖 IA (simulada)\n\nRecibí tu mensaje:\n"${prompt}"\n\nEsta respuesta simula la comunicación con una IA externa.`
        );
        observer.complete();
      }, 800);
    });
  }
}

