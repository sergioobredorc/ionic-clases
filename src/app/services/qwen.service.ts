// Un breve contexto sobre lo que hice, primero lo intente con una api de chatgpt y deepseek pero me di de cuenta que ambas tenia que pagar y me puse a buscar otras que fueran gratuitas y entre a https://openrouter.ai/qwen/qwen-2.5-7b-instruct openrouter es como una pagina donde estan todas las api de todas las IA y habian algunas gratuitas como llama o qwen que fue la que yo escogí, lo bueno es que te dan la apikeys y tiene abajo como la documentacion de como hacerlo con diferentes lenguajes de programacion me parecio buena, en cuestion de codigo es casi el mismo que el que uso usted, solo se cambiaban cosas minimas como aqui no se usa el model como gemini sino el assistant (es el que se encarga de responder los mensajes del usuario) y tambien el system (que es el que se encarga de dar el mensaje inicial ) 


import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, map } from "rxjs";

type QwenRole = 'user' | 'assistant' | 'system';

interface QwenMessage {
  role: QwenRole;
  content: string;
}

interface QwenGenerateResponse {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
}

@Injectable({ providedIn: 'root' })
export class QwenService {

  private model = 'qwen/qwen-2.5-7b-instruct';
  private apiKey = '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';
  private endpoint = 'https://openrouter.ai/api/v1/chat/completions';

  constructor(private http: HttpClient) {}

  generateReply(conversation: QwenMessage[]): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`,
      'HTTP-Referer': 'http://localhost:8100',
      'X-Title': 'Chat Ionic Qwen'
    });

    const body = {
      model: this.model,
      messages: conversation,
      temperature: 0.7,
      max_tokens: 2000
    };

    return this.http.post<QwenGenerateResponse>(this.endpoint, body, { headers }).pipe(
      map(res =>
        res?.choices?.[0]?.message?.content?.trim() || '...'
      )
    );
  }
}
