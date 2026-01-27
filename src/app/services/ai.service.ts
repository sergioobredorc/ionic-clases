import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AiService {

  private apiKey = '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'; 

  async preguntarIA(mensaje: string): Promise<string> {
    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'HTTP-Referer': 'http://localhost:8100',
          'X-Title': 'Ionic Chat IA'
        },
        body: JSON.stringify({
          model: 'deepseek/deepseek-chat',
          messages: [
            { role: 'user', content: mensaje }
          ]
        })
      });

      const data = await response.json();
      console.log(data);

      return data.choices[0].message.content;

    } catch (error) {
      console.error('Error OpenRouter:', error);
      return 'Error al conectar con la IA.';
    }
  }
}
