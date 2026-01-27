import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { GroqService, Message } from '../../services/groq';
import { addIcons } from 'ionicons';
import { send } from 'ionicons/icons';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ChatPage {
  input = '';
  sending = false;

  displayMessages: { from: 'user' | 'bot', text: string }[] = [
    { from: 'bot', text: 'Hola, soy Llama 3. ¿En qué puedo ayudarte hoy?' },
  ];

  conversationHistory: Message[] = [
    { role: 'system', content: 'Eres un asistente útil y amable en español.' }
  ];

  constructor(private groqSvc: GroqService) {
    addIcons({ send });
  }

  send() {
    const text = this.input.trim();
    if (!text || this.sending) return;

    this.sending = true;
    this.input = '';

    this.displayMessages.push({ from: 'user', text });
    this.conversationHistory.push({ role: 'user', content: text });

    this.groqSvc.generateReply(this.conversationHistory)
      .pipe(finalize(() => this.sending = false))
      .subscribe({
        next: (reply: string) => {
          this.displayMessages.push({ from: 'bot', text: reply });
          this.conversationHistory.push({ role: 'assistant', content: reply });
        },
        error: (err: any) => {
          console.error('Error detallado de Groq:', err);
          
          const errorMsg = err.error?.error?.message || 'Error desconocido';
          this.displayMessages.push({ from: 'bot', text: `Error: ${errorMsg}` });
        }
      });
  }

  trackByIndex(i: number) {
    return i;
  }
}