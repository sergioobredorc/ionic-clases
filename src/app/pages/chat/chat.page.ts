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
  }
}
