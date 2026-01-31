import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  stream!: MediaStream;
  mediaRecorder!: MediaRecorder;
  audioChunks: Blob[] = [];

  async requestPermissions() {
    this.stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    });
    return this.stream;
  }

  startRecording() {
    this.audioChunks = [];
    this.mediaRecorder = new MediaRecorder(this.stream);
    this.mediaRecorder.ondataavailable = e => {
      this.audioChunks.push(e.data);
    };
    this.mediaRecorder.start();
  }

  stopRecording(): Promise<Blob> {
    return new Promise(resolve => {
      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
        resolve(audioBlob);
      };
      this.mediaRecorder.stop();
    });
  }
}
