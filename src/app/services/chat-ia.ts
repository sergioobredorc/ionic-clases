import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, lastValueFrom } from 'rxjs';

type Rol = 'user' | 'assistant' | 'system';

interface MensajeIA {
  role: Rol;
  content: string;
}

interface RespuestaIA {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
  error?: {
    message?: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ChatIaService {

  private apiKey = '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';
  private endpoint = 'https://openrouter.ai/api/v1/chat/completions';
  private model = 'openai/gpt-3.5-turbo';

  constructor(private http: HttpClient) {}

  async preguntar(mensaje: string): Promise<string> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`,
      'HTTP-Referer': 'http://localhost:8100',
      'X-Title': 'Chat IA Ionic'
    });

    const body = {
      model: this.model,
      messages: [
        { role: 'user', content: mensaje }
      ],
      temperature: 0.7,
      max_tokens: 1000
    };

    return lastValueFrom(
      this.http
        .post<RespuestaIA>(this.endpoint, body, { headers })
        .pipe(
          map(res =>
            res?.choices?.[0]?.message?.content?.trim()
            || 'No hubo respuesta de la IA'
          )
        )
    );
  }
}
