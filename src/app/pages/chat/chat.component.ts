import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { GroqService } from '../../services/ia.service';
import { RouterLink } from '@angular/router';

type ChatMsg = { from: 'user' | 'bot'; text: string };

type GroqRole = 'system' | 'user' | 'assistant';

interface GroqMessage {
  role: GroqRole;
  content: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink]
})
export class ChatPage {
  input = '';
  sending = false;

  messages: ChatMsg[] = [
    { from: 'bot', text: 'Hola, soy tu asistente virtual. Que puedo hacer por ti?' }
  ];

  conversation: GroqMessage[] = [
    {
      role: 'system',
      content: `
        Eres ChatBot-Qwen3-32B, un asistente virtual que resuelve dudas e inconvenientes.
        Responde SIEMPRE de forma directa y natural.
        NO muestres razonamientos internos.
        NO uses etiquetas como <think>, <analysis> o similares.
        Da solo la respuesta final para el usuario.`
    }
  ];


  constructor(private groq: GroqService) {}

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

    this.groq
      .generateReply(this.conversation)
      .pipe(finalize(() => (this.sending = false)))
      .subscribe({
        next: (reply) => {
          let safeReply = reply?.trim() || '...';

          
          safeReply = safeReply.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();

          this.messages.push({ from: 'bot', text: safeReply });

          this.conversation.push({
            role: 'assistant',
            content: safeReply
          });
        },

        error: (err) => {
          console.error(err);
          const msg = 'Verifica que hallas añadido el apikey que se encuentra en el servicio e intentalo denuevo.';
          this.messages.push({ from: 'bot', text: msg });
        }
      });
  }

  trackByIndex(i: number) {
    return i;
  }
}