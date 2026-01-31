import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MediaService {

  stream: MediaStream | null = null;
  mediaRecorder!: MediaRecorder;
  audioChunks: Blob[] = [];

  async solicitarPermisos(): Promise<MediaStream> {
    this.stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    });
    return this.stream;
  }

  capturarFoto(video: HTMLVideoElement): string {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(video, 0, 0);

    return canvas.toDataURL('image/png');
  }

  grabarAudio(): Promise<Blob> {
    return new Promise(resolve => {
      this.audioChunks = [];
      this.mediaRecorder = new MediaRecorder(this.stream!);

      this.mediaRecorder.ondataavailable = e =>
        this.audioChunks.push(e.data);

      this.mediaRecorder.onstop = () =>
        resolve(new Blob(this.audioChunks, { type: 'audio/webm' }));

      this.mediaRecorder.start();
      setTimeout(() => this.mediaRecorder.stop(), 5000);
    });
  }
}
