import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonItem, IonTextarea } from '@ionic/angular/standalone';
import { PermisosService } from 'src/app/services/permisos.service';
import { SentimientoService } from 'src/app/services/sentimiento.service';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-permisos-camymic',
  templateUrl: './permisos-camymic.page.html',
  styleUrls: ['./permisos-camymic.page.scss'],
  standalone: true,
  imports: [ RouterModule, IonContent, IonButtons, IonButton, IonHeader, IonTitle, IonToolbar, IonItem, IonTextarea, CommonModule, FormsModule ]
})
export class PermisosCamymicPage {
  @ViewChild('videoElement', { static: false }) videoElement!: ElementRef<HTMLVideoElement>;
  
  cameraGranted = false;
  microphoneGranted = false;

  photoData: string | null = null;
  audioUrl: string | null = null;

  descriptionText: string = '';
  sentimentResult: any = null;
  sentimentError: string = '';

  isRecording = false;
  recordProgress = 0;
  elapsedTime = 0;
  private progressInterval: any;
  private stream: MediaStream | null = null;
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];

  constructor(
    private permisosService: PermisosService,
    private sentimientoService: SentimientoService,
    private router: Router,
    private ngZone: NgZone
  ) {}

  async requestPermissions() {
    try {
      this.stream = await this.permisosService.requestPermissions();
      this.cameraGranted = true;
      this.microphoneGranted = true;
      if (this.videoElement && this.videoElement.nativeElement) {
        this.videoElement.nativeElement.srcObject = this.stream;
      }
      this.stream.getAudioTracks().forEach(track => track.enabled = false);
    } catch {
      this.cameraGranted = false;
      this.microphoneGranted = false;
    }
  }

  removePermissions() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    this.cameraGranted = false;
    this.microphoneGranted = false;
    this.photoData = null;
    this.audioUrl = null;
    this.descriptionText = '';
    this.sentimentResult = null;
  }

  takePhoto() {
    const video = this.videoElement.nativeElement;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx?.drawImage(video, 0, 0);
    this.photoData = canvas.toDataURL('image/png');
  }

  removePhoto() {
    this.photoData = null;
    this.descriptionText = '';
    this.sentimentResult = null;
  }

  async recordAudio() {
    if (this.isRecording) return;
    this.isRecording = true;
    this.recordProgress = 0;
    this.elapsedTime = 0;
    this.audioChunks = [];
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);
      
      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };
      
      this.mediaRecorder.onstop = () => {
        clearInterval(this.progressInterval);
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);

        this.ngZone.run(() => {
          this.audioUrl = url;
          this.isRecording = false;
          this.recordProgress = 0;
          this.elapsedTime = 0;
        });
      };
      
      this.mediaRecorder.start();
      let elapsed = 0;
      this.progressInterval = setInterval(() => {
        elapsed += 0.5;
        this.ngZone.run(() => {
          this.elapsedTime = Math.floor(elapsed); 
          this.recordProgress = Math.min((elapsed / 5) * 100, 100);
        });
      }, 500);

      setTimeout(() => {
        if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
          this.mediaRecorder.stop();
        }
      }, 5000);
    } catch (err) {
      console.error('Error al grabar audio:', err);
      this.isRecording = false;
      this.recordProgress = 0;
      this.elapsedTime = 0;
    }
  }

  removeAudio() {
    this.audioUrl = null;
  }

  analizarSentimiento() {
    if (!this.descriptionText || this.descriptionText.trim().length === 0) {
      this.sentimentError = 'Debes escribir una descripción antes de analizar.';
      this.sentimentResult = null;
      return;
    }

    this.sentimientoService.analizeText(this.descriptionText).subscribe({
      next: (res: any[]) => {
        const errorItem = res.find(r => r.label === 'ERROR');
        if (errorItem) {
          this.sentimentError = errorItem.message;
          this.sentimentResult = null;
        } else {
          this.sentimentResult = res;
          this.sentimentError = '';
        }
      },
      error: () => {
        this.sentimentError = 'Error al analizar el texto';
        this.sentimentResult = null;
      }
    });
  }

  getSentimentClass(label: string): string {
    switch (label.toUpperCase()) {
      case 'POSITIVE': return 'positive';
      case 'NEGATIVE': return 'negative';
      case 'NEUTRAL': return 'neutral';
      case 'MIXED': return 'mixed';
      case 'CONFUSED': return 'confused';
      case 'ERROR': return 'error';
      default: return 'neutral';
    }
  }
}
