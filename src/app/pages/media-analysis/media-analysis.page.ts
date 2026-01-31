import { Component, ViewChild, ElementRef } from '@angular/core';
import { MediaService } from '../../services/camMic.service';
import { SentimentService } from '../../services/sentiment.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-media-analysis',
  templateUrl: './media-analysis.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class MediaAnalysisPage {

  @ViewChild('video') videoRef!: ElementRef;

  permissionsGranted = false;
  photo!: string;
  audioUrl!: string;

  text = '';
  sentimentResult: any;
  loading = false;

  constructor(
    private mediaService: MediaService,
    private sentimentService: SentimentService
  ) {}

  async requestPermissions() {
    const stream = await this.mediaService.requestPermissions();
    this.permissionsGranted = true;
    this.videoRef.nativeElement.srcObject = stream;
  }

  takePhoto() {
    const canvas = document.createElement('canvas');
    const video = this.videoRef.nativeElement;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(video, 0, 0);
    this.photo = canvas.toDataURL('image/png');
  }

  async recordAudio() {
    this.mediaService.startRecording();
    setTimeout(async () => {
      const audioBlob = await this.mediaService.stopRecording();
      this.audioUrl = URL.createObjectURL(audioBlob);
    }, 6000);
  }

  analyzeText() {
    this.loading = true;
    this.sentimentResult = null;

    this.sentimentService.analyze(this.text).subscribe({
      next: (res) => {
        this.sentimentResult = res[0][0];
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        alert('El modelo está cargando, intenta de nuevo en unos segundos');
      }
    });
  }
}
