import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MediaService {
  private mediaRecorder?: MediaRecorder;
  private audioChunks: Blob[] = [];

  async getPermissions() {
    return await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  }

  recordAudio(stream: MediaStream, duration: number): Promise<Blob> {
    return new Promise((resolve) => {
      this.mediaRecorder = new MediaRecorder(stream);
      this.audioChunks = [];

      this.mediaRecorder.ondataavailable = (event) => this.audioChunks.push(event.data);
      this.mediaRecorder.onstop = () => resolve(new Blob(this.audioChunks, { type: 'audio/webm' }));

      this.mediaRecorder.start();
      setTimeout(() => this.mediaRecorder?.stop(), duration);
    });
  }
}