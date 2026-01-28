import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { GeminiService } from 'src/app/services/gemini.service';


type ChatMsg = { from: 'user' | 'bot'; text: string };

type GeminiRole = 'user' | 'model';
interface GeminiMessage{
  role: GeminiRole;
  parts: { text: string }[]
}

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

  messages: ChatMsg[] =[
    { from: 'bot', text: 'Hola soy gemini, en que te puedo ayudar'},
  ];

  conversation: GeminiMessage[] =[
    { role: 'model', parts: [{ text: 'Hola en que te puedo ayudar'}]}
  ]

  constructor(private gemini: GeminiService) { }

  send(){
    const text = this.input.trim();
    if(!text || this.sending) return;

    this.sending = true;
    this.input = '';

    this.messages.push({ from: 'user', text });

    this.conversation.push({ role: 'user', parts: [{ text }] });

    this.gemini
      .generateReply(this.conversation)
      .pipe(finalize(() => (this.sending = false)))
      .subscribe({
        next: (reply) => {
          const safeReply = (reply ?? '').trim() || '...';

          this.messages.push({ from: 'bot', text: safeReply })

          this.conversation.push({
            role: 'model',
            parts: [{ text: safeReply }]
          });

        },
        error: (err) => {
          console.error(err);

          const msg = 'Ocurrió un error llamando a Gemini. Revisa la consola y tu API Key';
          this.conversation.push({
            role: 'model',
            parts: [{ text: msg }]
          })
        }
      })
  }

  trackByIndex(i: number){
    return i;
  }
}
