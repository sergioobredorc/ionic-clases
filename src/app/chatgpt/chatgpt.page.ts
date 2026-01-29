import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { ChatGPTService } from '../services/chatgpt.service';
import { RouterLink } from '@angular/router';

type ChatMsg = { from: 'user' | 'bot'; text: string };


type ChatGPTRole = 'user' | 'assistant';
interface ChatGPTMessage {
  role: ChatGPTRole;
  content: string;
}

@Component({
  selector: 'app-chatgpt',
  templateUrl: './chatgpt.page.html',
  styleUrls: ['./chatgpt.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink]
})
export class ChatgptComponent {
  input = '';
  sending = false;

  messages: ChatMsg[] = [
    { from: 'bot', text: '¡Hola! Soy ChatGPT, ¿en qué puedo ayudarte hoy?' },
  ];

  conversation: ChatGPTMessage[] = [
    { role: 'assistant', content: '¡Hola! Soy ChatGPT, ¿en qué puedo ayudarte hoy?' }
  ]

  constructor(private chatGPT: ChatGPTService) { }

  send() {
    const text = this.input.trim();
    if (!text || this.sending) return;

    this.sending = true;
    this.input = '';

    this.messages.push({ from: 'user', text });

    this.conversation.push({ role: 'user', content: text });

    this.chatGPT
      .generateReply(this.conversation)
      .pipe(finalize(() => (this.sending = false)))
      .subscribe({
        next: (reply) => {
          const safeReply = (reply ?? '').trim() || '...';

          this.messages.push({ from: 'bot', text: safeReply })

          this.conversation.push({
            role: 'assistant',
            content: safeReply
          });

        },
        error: (err) => {
          console.error(err);

          const msg = 'Ocurrió un error llamando a ChatGPT. Revisa la consola y tu API Key';
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


  clearChat() {
    this.messages = [
      { from: 'bot', text: '¡Hola! Soy ChatGPT, ¿en qué puedo ayudarte hoy?' }
    ];
    this.conversation = [
      { role: 'assistant', content: '¡Hola! Soy ChatGPT, ¿en qué puedo ayudarte hoy?' }
    ];
  }
}