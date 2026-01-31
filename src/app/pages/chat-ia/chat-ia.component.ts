import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ChatIaService } from '../../services/chat-ia';

@Component({
  selector: 'app-chat-ia',
  standalone: true,
  templateUrl: './chat-ia.component.html',
  styleUrls: ['./chat-ia.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ]
})
export class ChatIaComponent {

  mensaje = '';
  mensajes: { texto: string; autor: 'user' | 'ia' }[] = [];
  cargando = false;

  constructor(private chatIaService: ChatIaService) {}

  async enviar() {
    if (!this.mensaje.trim()) return;

    const textoUsuario = this.mensaje;
    this.mensaje = '';
    
    this.mensajes.push({ texto: textoUsuario, autor: 'user' });
    this.cargando = true;

    try {
      const respuesta = await this.chatIaService.preguntar(textoUsuario);
      this.mensajes.push({ texto: respuesta, autor: 'ia' });
    } catch (error) {
      this.mensajes.push({
        texto: 'Error al comunicarse con la IA',
        autor: 'ia'
      });
      console.error(error);
    } finally {
      this.cargando = false;
    }
  }
}
