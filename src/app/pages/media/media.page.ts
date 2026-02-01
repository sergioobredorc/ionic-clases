import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-media',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './media.page.html',
  styleUrls: ['./media.page.scss'],
})
export class MediaPage {

  @ViewChild('video', { static: false })
  video!: ElementRef<HTMLVideoElement>;

  cameraGranted = false;
  micGranted = false;
  stream!: MediaStream;

  photo: string | null = null;

  mediaRecorder!: MediaRecorder;
  audioURL: string | null = null;
  audioChunks: Blob[] = [];

  text = '';
  loading = false;
  sentimentResult: { label: string; score: number } | null = null;

  async requestPermissions() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });

      this.cameraGranted = true;
      this.micGranted = true;
      this.video.nativeElement.srcObject = this.stream;

    } catch {
      this.cameraGranted = false;
      this.micGranted = false;
    }
  }

  takePhoto() {
    const videoEl = this.video.nativeElement;
    const canvas = document.createElement('canvas');
    canvas.width = videoEl.videoWidth;
    canvas.height = videoEl.videoHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height);
    this.photo = canvas.toDataURL('image/png');
  }

  recordAudio() {
    this.audioChunks = [];
    this.mediaRecorder = new MediaRecorder(this.stream);

    this.mediaRecorder.ondataavailable = (e: BlobEvent) => {
      if (e.data.size > 0) this.audioChunks.push(e.data);
    };

    this.mediaRecorder.start();

    setTimeout(() => {
      this.mediaRecorder.stop();
      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
        this.audioURL = URL.createObjectURL(audioBlob);
      };
    }, 5000);
  }

  analyzeText() {
    if (!this.text) return;

    this.loading = true;
    this.sentimentResult = null;

    setTimeout(() => {
      const lower = this.text.toLowerCase();

      let label = 'neutral';
      if (lower.includes('bien') || lower.includes('correcto')) {
        label = 'positive';
      } else if (lower.includes('mal') || lower.includes('error')) {
        label = 'negative';
      }

      this.sentimentResult = {
        label,
        score: 0.9
      };

      this.loading = false;
    }, 1200);
  }
}
