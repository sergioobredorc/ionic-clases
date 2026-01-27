import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonInput,
  IonButton,
  IonItem,
  IonFooter
} from '@ionic/angular/standalone';

import { OpenAIService } from '../../services/openai.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonInput,
    IonButton,
    IonItem,
    IonFooter,
    CommonModule,
    FormsModule
  ]
})
export class ChatPage {

  messages: { text: string; from: 'user' | 'bot' }[] = [];
  input = '';
  sending = false; 

  constructor(private openAI: OpenAIService) {}

  send() {
    if (!this.input.trim() || this.sending) return;

    this.sending = true;

    const text = this.input;
    this.messages.push({ text, from: 'user' });
    this.input = '';

    this.openAI.sendMessage(text).subscribe({
      next: (reply: string) => {
        this.messages.push({ text: reply, from: 'bot' });
        this.sending = false;
      },
      error: () => {
        this.messages.push({
          text: 'Error al comunicarse con la IA',
          from: 'bot'
        });
        this.sending = false;
      }
    });
<<<<<<< HEAD
=======

    this.groq
      .generateReply(this.conversation)
      .pipe(finalize(() => (this.sending = false)))
      .subscribe({
        next: (reply) => {
          let safeReply = reply?.trim() || '...';

          // 🔥 Elimina bloques <think> si el modelo los envía
          safeReply = safeReply.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();

          this.messages.push({ from: 'bot', text: safeReply });

          this.conversation.push({
            role: 'assistant',
            content: safeReply
          });
        },

        error: (err) => {
          console.error(err);
          const msg = 'Error al comunicarse con Groq. Profesor no me deja publicar un api key real en github entonces le quite el ultimo numero que es el 9 hay que ponerlo y funciona a la perfeccion .';
          this.messages.push({ from: 'bot', text: msg });
        }
      });
  }

  trackByIndex(i: number) {
    return i;
>>>>>>> a5bae1e (Actividad 3: Chat IA)
  }
}
