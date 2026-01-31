import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SentimentService {

  analizarTexto(texto: string): Observable<any> {
    return new Observable(observer => {
      setTimeout(() => {
        observer.next({
          label: texto.includes('bien') ? 'POSITIVO' : 'NEUTRO',
          score: 0.87
        });
        observer.complete();
      }, 1000);
    });
  }
}
