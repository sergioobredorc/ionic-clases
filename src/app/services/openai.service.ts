import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenAIService {

  private apiKey = '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';
  private apiUrl = 'https://openrouter.ai/api/v1/chat/completions';

  constructor(private http: HttpClient) {}

  sendMessage(message: string): Observable<string> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`,
      'HTTP-Referer': 'http://localhost:8100',
      'X-Title': 'Chat Ionic'
    });

    const body = {
      model: 'openai/gpt-4o-mini',
      messages: [
        { role: 'user', content: message }
      ],
      temperature: 0.7
    };

    return this.http.post<any>(this.apiUrl, body, { headers }).pipe(
      map(res => {
        if (!res || !res.choices || !res.choices.length) {
          return 'La IA no devolvió respuesta.';
        }
        return res.choices[0].message?.content || 'Respuesta vacía.';
      }),
      catchError(err => {
        console.error('Error OpenRouter:', err);
        return throwError(() => err);
      })
    );
  }
}
