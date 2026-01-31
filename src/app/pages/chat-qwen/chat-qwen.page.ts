import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { QwenService } from '../../services/qwen.service';

type ChatMsg = { from: 'user' | 'bot'; text: string };

type QwenRole = 'user' | 'assistant' | 'system';
interface QwenMessage {
  role: QwenRole;
  content: string;
}
@Component({
  selector: 'app-chat-qwen',
  templateUrl: './chat-qwen.page.html',
  styleUrls: ['./chat-qwen.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ChatQwenPage {

  input = '';
  sending = false;

  messages: ChatMsg[] = [
    { from: 'bot', text: 'Hola soy Qwen, en que te puedo ayudar?' }
  ];

  conversation: QwenMessage[] = [
    {
      role: 'system',
      content: 'Hola en que te puedo ayudar.'
    }
  ];

  constructor(private qwen: QwenService) {}

  send() {
    const text = this.input.trim();
    if (!text || this.sending) return;

    this.sending = true;
    this.input = '';

    this.messages.push({ from: 'user', text });
    this.conversation.push({ role: 'user', content: text });

    this.qwen
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
          const msg ='Profe para que le funcione debe ir a qwen.service.ts y en la apikey va a colocar al final un 9 para que funcione porque despues el openrouter me lo desabilita porque no deja colocar apikey en repositorios publicos';
          this.messages.push({ from: 'bot', text: msg });
        }
      });
  }

  trackByIndex(i: number) {
    return i;
  }
}
