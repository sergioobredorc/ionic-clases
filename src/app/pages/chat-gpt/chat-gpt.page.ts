import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { ChatGptService } from 'src/app/services/openai.service';

type ChatMsg = { from: 'user' | 'bot'; text: string };

type ChatRole = 'user' | 'assistant' | 'system';

interface ChatMessage {
  role: ChatRole;
  content: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat-gpt.page.html',
  styleUrls: ['./chat-gpt.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ChatGptPage {

  input = '';
  sending = false;

  messages: ChatMsg[] = [
    { from: 'bot', text: 'Hola, soy ChatGPT. ¿En qué te puedo ayudar?' },
  ];

  conversation: ChatMessage[] = [
    { role: 'system', content: 'Eres un asistente amable y claro.' },
    { role: 'assistant', content: 'Hola, ¿en qué te puedo ayudar?' }
  ];

  constructor(private chatgpt: ChatGptService) {}

  send() {
    const text = this.input.trim();
    if (!text || this.sending) return;

    this.sending = true;
    this.input = '';

    // UI
    this.messages.push({ from: 'user', text });

    // Historial para la API
    this.conversation.push({ role: 'user', content: text });

    this.chatgpt
      .generateReply(this.conversation)
      .pipe(finalize(() => (this.sending = false)))
      .subscribe({
        next: (reply) => {
          const safeReply = (reply ?? '').trim() || '...';

          this.messages.push({ from: 'bot', text: safeReply });

          this.conversation.push({
            role: 'assistant',
            content: safeReply
          });
        },
        error: (err) => {
          console.error(err);

          const msg =
            'Ocurrió un error llamando a ChatGPT. Revisa la consola y tu API Key.';

          this.messages.push({ from: 'bot', text: msg });

          this.conversation.push({
            role: 'assistant',
            content: msg
          });
        }
      });
  }

  trackByIndex(i: number) {
    return i;
  }
}
