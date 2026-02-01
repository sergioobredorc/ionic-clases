import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AiSentimentService {

  constructor() { }

  analyze(text: string): Observable<any> {
    
    const lowerText = text.toLowerCase();
    let label = 'neutral';
    let score = 0.5;

    if (lowerText.match(/feliz|bien|gusta|amor|excelente|bueno|genial|gracias/)) {
      label = 'positive';
      score = 0.98;
    } else if (lowerText.match(/triste|mal|odio|feo|error|falla|raro|dolor|miedo/)) {
      label = 'negative';
      score = 0.92;
    }
    const mockResponse = [
      { label: label, score: score }
    ];

    return of(mockResponse).pipe(
      delay(1500) 
    );
  }
}
