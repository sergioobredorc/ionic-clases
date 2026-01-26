import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';

interface OpenRouterResponse {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
}

@Injectable({ providedIn: 'root' })
export class OpenRouterService {

  private endpoint = 'https://openrouter.ai/api/v1/chat/completions';

  private apiKey = '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';

  constructor(private http: HttpClient) {}

  generateReply(messages: { role: string; content: string }[]): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`,
      'HTTP-Referer': 'http://localhost:8100', 
      'X-Title': 'Ionic Chat'
    });

    const body = {
      model: 'meta-llama/llama-3-8b-instruct',
      messages,
      temperature: 0.7
    };

    return this.http
      .post<OpenRouterResponse>(this.endpoint, body, { headers })
      .pipe(
        map(res => res?.choices?.[0]?.message?.content?.trim() || '...')
      );
  }
}
