import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { MediaService } from '../../service/media.service';
import { sentimentService } from '../../service/sentiment.service';

@Component({
  standalone: true,
  selector: 'app-actividad5',
  templateUrl: './actividad5.page.html',
  imports: [CommonModule, IonicModule, FormsModule],
})
export class Actividad5Page {
  @ViewChild('video', { static: false }) video!: ElementRef<HTMLVideoElement>;

  hasCamera = false;
  hasMic = false;

  imageData: string | null = null;
  audioUrl: string | null = null;

  isRecording = false;
  description = '';
  analysisResult: any = null;
  loadingAnalysis = false;

  constructor(
    private media: MediaService,
    private sentiment: sentimentService,
  ) {}

  async requestPermissions() {
    try {
      const stream = await this.media.requestPermissions();

      this.hasCamera = true;
      this.hasMic = true;

      const videoEl = this.video.nativeElement;
      videoEl.srcObject = stream;
      videoEl.muted = true; // 🔇 AQUÍ se silencia
      await videoEl.play();
    } catch {
      this.hasCamera = false;
      this.hasMic = false;
    }
  }

  captureImage() {
    const video = this.video.nativeElement;

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 320;
    canvas.height = video.videoHeight || 240;

    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(video, 0, 0);

    this.imageData = canvas.toDataURL('image/png');
  }

  async startAudioRecord() {
    if (this.isRecording) return;

    this.isRecording = true;
    this.media.startRecording();

    setTimeout(async () => {
      const blob = await this.media.stopRecording();
      this.audioUrl = URL.createObjectURL(blob);
      this.isRecording = false;
    }, 5500);
  }

  runSentimentAnalysis() {
    this.loadingAnalysis = true;
    this.analysisResult = null;

    this.sentiment.analyzeText(this.description).subscribe({
      next: (res: any[]) => {
        this.analysisResult = res[0];
        this.loadingAnalysis = false;
      },
      error: () => {
        this.loadingAnalysis = false;
      },
    });
  }
}
