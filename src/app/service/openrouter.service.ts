import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export type ORMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

interface ORResponse {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
}

@Injectable({ providedIn: 'root' })
export class OpenRouterService {
  private endpoint = 'https://openrouter.ai/api/v1/chat/completions';

  // 🔁 Puedes cambiar el modelo cuando quieras
  private model = 'qwen/qwen-2.5-7b-instruct';
  // ejemplos:
  // mistralai/mistral-7b-instruct
  // openai/gpt-4o-mini

  private apiKey =
    'sk-or-v1-220c4f09ba28bbbb72c21d5ad8266b83e4dbab6de6f8b03e9e73c3b072b41ca';

  constructor(private http: HttpClient) {}

  generateReply(messages: ORMessage[]): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`,
      'HTTP-Referer': 'http://localhost', // obligatorio para OpenRouter
      'X-Title': 'Ionic Chat App',
    });

    const body = {
      model: this.model,
      messages,
      temperature: 0.7,
      max_tokens: 2000,
    };

    return this.http
      .post<ORResponse>(this.endpoint, body, { headers })
      .pipe(map((res) => res?.choices?.[0]?.message?.content?.trim() || '...'));
  }
}
