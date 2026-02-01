import { Injectable } from '@angular/core';
import { of, delay, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SentimientoService {
  analizeText(text: string): Observable<any[]> {
    if (!text || text.trim().length === 0) {
      return of([{ label: 'ERROR', score: 0, message: 'No existe texto para analizar' }]).pipe(delay(500));
    } else if (text.toLowerCase().includes('bien') || text.toLowerCase().includes('genial') || text.toLowerCase().includes('feliz')) {
      return of([{ label: 'POSITIVE', score: 0.95 }]).pipe(delay(500));
    } else if (text.toLowerCase().includes('mal') || text.toLowerCase().includes('triste') || text.toLowerCase().includes('error')) {
      return of([{ label: 'NEGATIVE', score: 0.92 }]).pipe(delay(500));
    } else if (text.toLowerCase().includes('mezcla') || text.toLowerCase().includes('confuso')) {
      return of([{ label: 'MIXED', score: 0.50 }, { label: 'CONFUSED', score: 0.40 }]).pipe(delay(500));
    } else {
      return of([{ label: 'NEUTRAL', score: 0.60 }]).pipe(delay(500));
    }
  }
}
