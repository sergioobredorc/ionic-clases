import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

interface GroqMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface GroqResponse {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
}
// el ultimo numero de la API KEY es el 9
@Injectable({ providedIn: 'root' })
export class GroqService {
  private apiKey = 'gsk_zoALmjDfXEmWuJnJm6RWWGdyb3FYr8FL2O6qnD55uf2ocCtYNao';

  private endpoint = 'https://api.groq.com/openai/v1/chat/completions';

  private model = 'qwen/qwen3-32b';

  constructor(private http: HttpClient) {}

  generateReply(messages: GroqMessage[]): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`
    });

    const body = {
      model: this.model,
      messages,
      temperature: 0.7,
      max_tokens: 2000
    };

    return this.http.post<GroqResponse>(this.endpoint, body, { headers }).pipe(
      map(res => res?.choices?.[0]?.message?.content || '...')
    );
  }
}
