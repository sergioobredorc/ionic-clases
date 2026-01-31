import {
  Component,
  OnDestroy,
  ViewChild,
  ElementRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-permisos',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  templateUrl: './permisos.page.html',
  styleUrls: ['./permisos.page.scss'],
})
export class PermisosPage implements OnDestroy {

  cameraGranted: boolean | null = null;
  micGranted: boolean | null = null;

  stream: MediaStream | null = null;

  @ViewChild('video')
  videoRef!: ElementRef<HTMLVideoElement>;

  photoDataUrl: string | null = null;

  mediaRecorder!: MediaRecorder;
  audioChunks: Blob[] = [];
  audioUrl: string | null = null;

  descriptionText = '';

  sentimentResult: {
    label: string;
    score: number;
  } | null = null;

  analyzing = false;

  async requestPermissions() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
      });

      this.cameraGranted = true;
      this.micGranted = true;

      this.startCameraPreview();

    } catch (error) {
      console.error('Permisos denegados', error);
      this.cameraGranted = false;
      this.micGranted = false;
    }
  }

  startCameraPreview() {
    setTimeout(() => {
      if (this.videoRef && this.stream) {
        this.videoRef.nativeElement.srcObject = this.stream;
        this.videoRef.nativeElement.play();
      }
    });
  }

  takePhoto() {
    if (!this.videoRef) return;

    const video = this.videoRef.nativeElement;

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0);

    this.photoDataUrl = canvas.toDataURL('image/png');
  }

  async recordAudio() {
    const audioStream = await navigator.mediaDevices.getUserMedia({
      audio: true
    });

    this.audioChunks = [];
    this.audioUrl = null;

    this.mediaRecorder = new MediaRecorder(audioStream);

    this.mediaRecorder.ondataavailable = e => {
      this.audioChunks.push(e.data);
    };

    this.mediaRecorder.onstop = () => {
      const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
      this.audioUrl = URL.createObjectURL(audioBlob);

      audioStream.getTracks().forEach(t => t.stop());
    };

    this.mediaRecorder.start();

    setTimeout(() => {
      this.mediaRecorder.stop();
    }, 5000);
  }

  async analyzeText() {
    if (!this.descriptionText.trim()) return;

    this.analyzing = true;
    this.sentimentResult = null;

    try {
      const response = await fetch('http://localhost:5000/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: this.descriptionText
        })
      });

      const data = await response.json();

      const results = data[0];

      const best = results.reduce((prev: any, curr: any) =>
        curr.score > prev.score ? curr : prev
      );

      const labelMap: Record<string, string> = {
        LABEL_0: 'Negativo 😠',
        LABEL_1: 'Neutral 😐',
        LABEL_2: 'Positivo 😄'
      };

      this.sentimentResult = {
        label: labelMap[best.label] ?? best.label,
        score: best.score
      };

    } catch (error) {
      console.error('Error analizando texto', error);
    } finally {
      this.analyzing = false;
    }
  }


  ngOnDestroy() {
    this.stream?.getTracks().forEach(track => track.stop());
  }
}
