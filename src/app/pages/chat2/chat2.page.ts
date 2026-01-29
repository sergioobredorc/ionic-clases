import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { GroqService } from '../../services/groq.service';

type ChatMsg = { from: 'user' | 'bot'; text: string };

@Component({
  selector: 'app-chat2',
  templateUrl: './chat2.page.html',
  styleUrls: ['./chat2.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Chat2Page {
  input = '';
  sending = false;
  messages: ChatMsg[] = [{ from: 'bot', text: 'Hola, soy Llama 3 (Groq), ¿en qué te ayudo hoy?' }];
  
  
  conversation: any[] = [{ role: 'assistant', content: 'Hola, soy Llama 3 (Groq), ¿en qué te ayudo hoy?' }];

  constructor(private groq: GroqService) { }

  send() {
    const text = this.input.trim();
    if (!text || this.sending) return;

    this.sending = true;
    this.messages.push({ from: 'user', text });
    this.conversation.push({ role: 'user', content: text });
    this.input = '';

    this.groq.generateReply(this.conversation)
      .pipe(finalize(() => (this.sending = false)))
      .subscribe({
        next: (reply) => {
          this.messages.push({ from: 'bot', text: reply });
          this.conversation.push({ role: 'assistant', content: reply });
        },
        error: (err) => {
          console.error(err);
          this.messages.push({ from: 'bot', text: 'Error de conexión con Groq.' });
        }
      });
  }
}