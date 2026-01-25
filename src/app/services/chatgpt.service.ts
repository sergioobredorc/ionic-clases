import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private iaApiUrl = 'https://openrouter.ai/api/v1/chat/completions';
  private iaApiKey = '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';

  constructor(private http: HttpClient) {}

  sendMessage(message: string) {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.iaApiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'http://localhost:8100',
      'X-Title': 'ChatGPT Ionic'
    });

    const body = {
      model: 'mistralai/mistral-7b-instruct',
      messages: [
        {
          role: 'user',
          content: message
        }
      ]
    };

    return this.http.post(this.iaApiUrl, body, { headers });
  }
}
