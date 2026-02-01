import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonItem, IonFooter, IonList } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { AiService } from '../../services/ai.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonInput,
    IonButton,
    IonItem,
    IonFooter,
    IonList,
    FormsModule,
    NgFor
  ],
})
export class ChatComponent {
  mensajes: any[] = [];
  textoUsuario = '';
  cargando = false;

  constructor(private ai: AiService) {}

  async enviarMensaje() {
    if (!this.textoUsuario.trim()) return;

    this.mensajes.push({ de: 'Usuario', texto: this.textoUsuario });
    
    const pregunta = this.textoUsuario;
    this.textoUsuario = '';
    this.cargando = true;

    try {
  
      const respuesta = await this.ai.preguntarIA(pregunta);
      
      // Agregar respuesta de la IA
      this.mensajes.push({ de: 'IA', texto: respuesta });
    } catch (error) {
      console.error('Error:', error);
      this.mensajes.push({ de: 'IA', texto: 'Error al conectar con la IA' });
    } finally {
      this.cargando = false;
    }
  }
}
