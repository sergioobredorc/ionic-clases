import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenAIService {

  // 🔐 PEGA AQUÍ TU API KEY DE OPENROUTER
  private apiKey = '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';

  private apiUrl = 'https://openrouter.ai/api/v1/chat/completions';

  constructor(private http: HttpClient) {}

  sendMessage(message: string): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`,
      // headers recomendados por OpenRouter
      'HTTP-Referer': 'http://localhost:8100',
      'X-Title': 'Chat IA Académico'
    });

    const body = {
      model: 'meta-llama/llama-3.3-70b-instruct:free',
      messages: [
        { role: 'user', content: message }
      ],
      temperature: 0.7
    };

    return this.http.post<any>(this.apiUrl, body, { headers }).pipe(
      map(res => res.choices[0].message.content)
    );
  }
}
