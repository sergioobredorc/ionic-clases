import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { OpenRouterService } from '../../services/openrouter.service';


type ChatMsg = { from: 'user' | 'bot'; text: string };

type OpenRouterRole = 'user' | 'assistant';

interface OpenRouterMessage {
  role: OpenRouterRole;
  content: string;
}

@Component({
  selector: 'app-openrouter',
  templateUrl: './openrouter.page.html',
  styleUrls: ['./openrouter.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class OpenrouterPage {

  input = '';
  sending = false;

  messages: ChatMsg[] = [
    { from: 'bot', text: 'Hola soy LLaMA, ¿en qué te puedo ayudar?' }
  ];

  conversation: OpenRouterMessage[] = [
    { role: 'assistant', content: 'Hola, ¿en qué te puedo ayudar?' }
  ];

  apiReady = false;

  constructor(private openrouter: OpenRouterService) { this.apiReady = this.openrouter.hasValidKey();}

  send() {
    const text = this.input.trim();
    if (!text || this.sending) return;

    this.sending = true;
    this.input = '';


    this.messages.push({ from: 'user', text });

    this.conversation.push({
      role: 'user',
      content: text
    });

    this.openrouter
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

          const msg = 'Ocurrió un error llamando a LLaMA. Revisa la consola y tu API Key';
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
