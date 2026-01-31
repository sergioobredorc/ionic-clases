import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { OpenAIService } from '../../services/openai.service';

type ChatMsg = { from: 'user' | 'bot'; text: string };

@Component({
  selector: 'app-chat',
  standalone: true,
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ChatPage {

  input = '';
  sending = false;

  messages: ChatMsg[] = [
    { from: 'bot', text: 'Hola 👋 soy una IA. ¿En qué te ayudo?' }
  ];

  conversation: { role: string; content: string }[] = [
    { role: 'system', content: 'Eres un asistente útil y amable.' }
  ];

  constructor(private openai: OpenAIService) {}

  send() {
    const text = this.input.trim();
    if (!text || this.sending) return;

    this.sending = true;
    this.input = '';

    this.messages.push({ from: 'user', text });
    this.conversation.push({ role: 'user', content: text });

this.openai.ask(text)
  .pipe(finalize(() => this.sending = false))
  .subscribe({
    next: (reply: string) => {
      const safeReply = reply?.trim() || '...';
      this.messages.push({ from: 'bot', text: safeReply });
    },
    error: (err: any) => {
      console.error(err);
      this.messages.push({
        from: 'bot',
        text: '❌ Error al conectar con la IA'
      });
    }
  });

  }

  trackByIndex(index: number) {
    return index;
  }
}
