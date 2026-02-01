import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonItem,
  IonLabel,
  IonTextarea,
  IonCard,
  IonCardContent,
  IonIcon
} from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';
import { AiSentimentService } from '../../services/ai-sentiment.service';

@Component({
  selector: 'app-captura',
  standalone: true,
  templateUrl: './captura.component.html',
  styleUrls: ['./captura.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonItem,
    IonLabel,
    IonTextarea,
    IonCard,
    IonCardContent,
    IonIcon
  ]
})
export class CapturaComponent {
  @ViewChild('video', { static: false }) video!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas', { static: false }) canvas!: ElementRef<HTMLCanvasElement>;

  camaraPermitida = false;
  microfonoPermitido = false;

  fotoTomada: string | null = null;
  audioURL: string | null = null;

  descripcion = '';
  resultadoSentimiento: any = null;

  mediaRecorder!: MediaRecorder;
  audioChunks: Blob[] = [];

  constructor(private http: HttpClient, private aiSentiment: AiSentimentService) {}


  async solicitarPermisos() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });

      this.camaraPermitida = true;
      this.microfonoPermitido = true;

      this.video.nativeElement.srcObject = stream;
      this.video.nativeElement.play();
    } catch (error) {
      console.error(error);
      alert('Permisos denegados');
    }
  }


  tomarFoto() {
    const video = this.video.nativeElement;
    const canvas = this.canvas.nativeElement;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(video, 0, 0);

    this.fotoTomada = canvas.toDataURL('image/png');
  }


  async grabarAudio() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    this.mediaRecorder = new MediaRecorder(stream);
    this.audioChunks = [];

    this.mediaRecorder.ondataavailable = e => {
      this.audioChunks.push(e.data);
    };

    this.mediaRecorder.onstop = () => {
      const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
      this.audioURL = URL.createObjectURL(audioBlob);
    };

    this.mediaRecorder.start();

    setTimeout(() => {
      this.mediaRecorder.stop();
    }, 5000);
  }

  analizarTexto() {
    if (!this.descripcion || !this.descripcion.trim()) return;
    this.resultadoSentimiento = null;
    this.aiSentiment.analyze(this.descripcion).subscribe((res: any) => {
      this.resultadoSentimiento = res;
    }, (err: any) => {
      console.error(err);
      alert('Error al analizar sentimiento');
    });
  }
}
