import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

type ChatMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

interface OpenAIResponse {
  output_text?: string;
  output?: Array<{
    content?: Array<{ type: string; text?: string }>;
  }>;
}

@Injectable({ providedIn: 'root' })
export class ChatGptService {

  private apiKey = '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';
  private endpoint = 'https://api.openai.com/v1/responses';

  constructor(private http: HttpClient) {}

  generateReply(conversation: ChatMessage[]): Observable<string> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    });

    const prompt = conversation
      .map(m => `${m.role === 'user' ? 'Usuario' : 'Asistente'}: ${m.content}`)
      .join('\n');

    const body = {
      model: 'gpt-4.1-mini',
      input: prompt,
      max_output_tokens: 800
    };

    return this.http.post<any>(this.endpoint, body, { headers }).pipe(
      map(res => {
        const text =
          res.output?.[0]?.content?.find((c: any) => c.type === 'output_text')?.text;

        return text?.trim() || '...';
      })
    );
  }
}