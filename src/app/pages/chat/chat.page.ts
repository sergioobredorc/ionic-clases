import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { CopilotService } from '../../services/copilot.service';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

type ChatMsg = { from: 'user' | 'bot'; text: string };

type CopilotRole = 'system' | 'user' | 'assistant';

interface CopilotMessage{
  role: CopilotRole;
  content: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
})
export class ChatPage  {
  input = '';
  sending = false;

  messages: ChatMsg[] = [
    { from: 'bot', text: 'Hola! soy copilot en que te puedo ayudar' }
  ];

  conversation: CopilotMessage[] =[
    { role: 'system', content: 'Eres un asistente virtual de ayuda.' }
  ]

  constructor(private copilot: CopilotService, private router: Router) { }

  send(){
    const text = this.input.trim();
    if(!text || this.sending) return;

    this.sending = true;
    this.input = '';

    this.messages.push({ from: 'user', text });

    this.conversation.push({ role: 'user', content: text });

    this.copilot
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
          if (err.status === 429) {
            this.messages.push({ from: 'bot', text: 'Has hecho demasiadas solicitudes. Intenta de nuevo en unos segundos.' });
          } else {
            this.messages.push({ from: 'bot', text: 'Ocurrió un error llamando a Copilot. Revisa tu API Key.' });
          }
        }
      })
    }

  trackByIndex(i: number){
    return i;
  }
}
