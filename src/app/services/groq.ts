import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class GroqService {
  
  private model = 'llama-3.3-70b-versatile';

  private apiKey = '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'; 

  private endpoint = 'https://api.groq.com/openai/v1/chat/completions';

  constructor(private http: HttpClient) {}

  generateReply(history: Message[]): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    });

    const body = {
      model: this.model,
      messages: history,
      temperature: 0.7
    };

    return this.http.post<any>(this.endpoint, body, { headers }).pipe(
      map(response => response.choices[0]?.message?.content || 'Error: Sin respuesta')
    );
  }
}