import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ChatService } from 'src/app/services/chatgpt.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-chatgpt',
  templateUrl: './chatgpt.page.html',
  styleUrls: ['./chatgpt.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ChatgptPage {

  usuarioInput = '';
  messages: any[] = [];
  sending = false;

  constructor (private chatService: ChatService) {}

  sendMessage() {
    if (!this.usuarioInput.trim() || this.sending) return;

    this.sending = true

    this.messages.push({
      from: 'user',
      text: this.usuarioInput
    });

    this.chatService.sendMessage(this.usuarioInput).subscribe(
      (respuesta: any) => {
        this.sending = false
        const reply = respuesta.choices[0].message.content;
        this.messages.push({
          from: 'bot',
          text: reply
        });
      },
      error => {
        this.messages.push({
          from: 'bot',
          text: 'Error al enviar la respuesta 🫨'
        });
      }
    );

    this.usuarioInput = '';
  }
}
