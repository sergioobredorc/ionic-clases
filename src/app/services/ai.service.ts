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
