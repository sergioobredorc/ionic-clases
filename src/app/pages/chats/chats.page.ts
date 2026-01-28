import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { OpenRouterService, ORMessage } from '../../service/openrouter.service';

type ChatMsg = { from: 'user' | 'bot'; text: string };

@Component({
  selector: 'app-chat',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class ChatsPage {
  input = '';
  sending = false;

  messages: ChatMsg[] = [
    { from: 'bot', text: 'Hola, soy una IA. ¿En qué te puedo ayudar?' },
  ];

  conversation: ORMessage[] = [
    {
      role: 'system',
      content: 'Eres un asistente útil, claro y amable.',
    },
    {
      role: 'assistant',
      content: 'Hola, ¿en qué te puedo ayudar?',
    },
  ];

  constructor(private openRouter: OpenRouterService) {}

  send() {
    const text = this.input.trim();
    if (!text || this.sending) return;

    this.sending = true;
    this.input = '';

    this.messages.push({ from: 'user', text });

    this.conversation.push({
      role: 'user',
      content: text,
    });

    this.openRouter
      .generateReply(this.conversation)
      .pipe(finalize(() => (this.sending = false)))
      .subscribe({
        next: (reply) => {
          const safeReply = reply || '...';

          this.messages.push({ from: 'bot', text: safeReply });

          this.conversation.push({
            role: 'assistant',
            content: safeReply,
          });
        },
        error: (err) => {
          console.error(err);

          const msg =
            'Profe debido a que no se puede colocar la apiKey en un repositorio publico debe ir a openrouter.service.ts y en la apiKey en lo ultimo colocar un 8 para que funcione correctamente';
          this.messages.push({ from: 'bot', text: msg });

          this.conversation.push({
            role: 'assistant',
            content: msg,
          });
        },
      });
  }

  trackByIndex(i: number) {
    return i;
  }
}
