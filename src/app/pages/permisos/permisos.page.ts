import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon, } from '@ionic/angular/standalone';
import { NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { TranscripcionService } from 'src/app/services/transcripcion.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.page.html',
  styleUrls: ['./permisos.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    CommonModule,
    FormsModule,
    IonIcon,
    RouterLink
  ]
})
export class PermisosPage implements OnInit {

  estadoCamara: 'concedido' | 'denegado' | 'desconocido' = 'desconocido';
  estadoMicrofono: 'concedido' | 'denegado' | 'desconocido' = 'desconocido';
  videoStream: MediaStream | null = null;
  fotoCapturada: string | null = null;

  mediaRecorder: MediaRecorder | null = null;
  audioChunks: Blob[] = [];
  audioUrl: string | null = null;
  grabando = false;
  segundosRestantes = 0;

  transcripcionTexto: string = '';
  transcribiendo: boolean = false;
  audioGrabadoBlob: Blob | null = null;

  private http = inject(HttpClient);


  constructor(private zone: NgZone, private transcripcionService: TranscripcionService) { }

  ngOnInit() { }

  async solicitarPermisos() {
    await this.pedirPermisoCamara();
    await this.pedirPermisoMicrofono();
  }

  private async pedirPermisoCamara() {
    try {
      const flujo = await navigator.mediaDevices.getUserMedia({ video: true });
      this.estadoCamara = 'concedido';
      flujo.getTracks().forEach(pista => pista.stop());
    } catch (error) {
      console.error('Error cámara:', error);
      this.estadoCamara = 'denegado';
    }
  }

  private async pedirPermisoMicrofono() {
    try {
      const flujo = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.estadoMicrofono = 'concedido';
      flujo.getTracks().forEach(pista => pista.stop());
    } catch (error) {
      console.error('Error Micorofono:', error);
      this.estadoMicrofono = 'denegado';
    }
  }

  async iniciarCamara() {
    try {
      this.videoStream = await navigator.mediaDevices.getUserMedia({ video: true });

      const video = document.querySelector('video') as HTMLVideoElement;
      if (video) {
        video.srcObject = this.videoStream;
        await video.play();
      }

    } catch (error) {
      console.error('Error al iniciar cámara:', error);
    }
  }
  detenerCamara() {
    if (this.videoStream) {
      this.videoStream.getTracks().forEach(track => track.stop());
      this.videoStream = null;
    }

    const video = document.querySelector('video') as HTMLVideoElement;
    if (video) {
      video.srcObject = null;
    }
  }


  tomarFoto() {
    const video = document.querySelector('video') as HTMLVideoElement;
    const canvas = document.querySelector('canvas') as HTMLCanvasElement;

    if (!video || !canvas) return;

    const contexto = canvas.getContext('2d');
    if (!contexto) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    contexto.drawImage(video, 0, 0, canvas.width, canvas.height);

    this.fotoCapturada = canvas.toDataURL('image/png');
  }

  async grabarAudio() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      this.audioChunks = [];
      this.grabando = true;
      this.segundosRestantes = 5;

      this.mediaRecorder = new MediaRecorder(stream);

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };

      this.mediaRecorder.onstop = () => {
        this.zone.run(() => {
          const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });

          this.audioUrl = URL.createObjectURL(audioBlob);
          this.audioGrabadoBlob = audioBlob;

          this.grabando = false;
          this.segundosRestantes = 0;
        });

        stream.getTracks().forEach(track => track.stop());
      };


      this.mediaRecorder.start();

      const intervalo = setInterval(() => {
        this.zone.run(() => {
          this.segundosRestantes--;
        });

        if (this.segundosRestantes <= 0) {
          clearInterval(intervalo);
          if (this.mediaRecorder?.state === 'recording') {
            this.mediaRecorder.stop();
          }
        }
      }, 1200);

    } catch (error) {
      console.error('Error al grabar audio:', error);
      this.grabando = false;
      this.segundosRestantes = 0;
    }
  }

  async transcribirAudio() {
    console.log(' Botón transcribir presionado');

    if (!this.audioGrabadoBlob) {
      alert('Primero debes grabar un audio');
      return;
    }

    this.transcribiendo = true;
    this.transcripcionTexto = '';

    console.log('Enviando audio al backend...');

    this.transcripcionTexto =
      await this.transcripcionService.transcribirAudio(this.audioGrabadoBlob);

    console.log('Respuesta recibida:', this.transcripcionTexto);

    this.transcribiendo = false;
  }

}
