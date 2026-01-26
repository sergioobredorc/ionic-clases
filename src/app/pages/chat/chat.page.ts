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
  IonList,
  IonFooter
} from '@ionic/angular/standalone';

import { OpenAIService } from '../../services/openai.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonInput,
    IonButton,
    IonItem,
    IonList,
    IonFooter
  ]
})
export class ChatPage {

  messages: { text: string; from: 'user' | 'bot' }[] = [];
  input: string = '';
  sending: boolean = false;

  constructor(private openAI: OpenAIService) {}

  send(): void {
    if (!this.input.trim() || this.sending) return;

    const text = this.input;
    this.messages.push({ text, from: 'user' });
    this.input = '';
    this.sending = true;

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

  trackByIndex(index: number): number {
    return index;
  }
}
