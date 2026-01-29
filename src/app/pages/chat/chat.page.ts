import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { GeminiService } from '../../services/gemini.service';

type ChatMsg = { from: 'user' | 'bot'; text: string };
type GeminiRole = 'user' | 'model';

interface GeminiMessage {
  role: GeminiRole;
  parts: { text: string }[];
}

@Component({
  selector: 'app-chat',
  standalone: true,
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
})
export class ChatPage {

  input: string = '';
  sending: boolean = false;

  messages: ChatMsg[] = [
    { from: 'bot', text: 'Hola 👋 Soy Gemini, ¿en qué te puedo ayudar?' }
  ];

  conversation: GeminiMessage[] = [
    {
      role: 'model',
      parts: [{ text: 'Hola, soy Gemini y estoy listo para ayudarte.' }]
    }
  ];

  constructor(private gemini: GeminiService) {}

  send(): void {
    const text = this.input.trim();
    if (!text || this.sending) return;

    this.sending = true;

    // Mensaje del usuario
    this.messages.push({ from: 'user', text });
    this.conversation.push({
      role: 'user',
      parts: [{ text }]
    });

    this.input = '';

    this.gemini.generateReply(this.conversation)
      .pipe(finalize(() => (this.sending = false)))
      .subscribe({
        next: (reply: string) => {
          const safeReply = reply?.trim() || 'No tengo respuesta en este momento.';
          
          this.messages.push({ from: 'bot', text: safeReply });
          this.conversation.push({
            role: 'model',
            parts: [{ text: safeReply }]
          });
        },
        error: (err) => {
          console.error('Gemini error:', err);
          this.messages.push({
            from: 'bot',
            text: '❌ Error al conectar con Gemini.'
          });
        }
      });
  }

  trackByIndex(index: number): number {
    return index;
  }
}
