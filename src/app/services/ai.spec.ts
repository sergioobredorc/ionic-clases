import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AiService {

  private apiKey = 'sk-bcf9901ab3e74409b1ea3b7d61c5ccbf';

  async preguntarIA(mensaje: string): Promise<string> {

    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'user', content: mensaje }
        ]
      })
    });

    const data = await response.json();
    return data.choices[0].message.content;
  }
}
