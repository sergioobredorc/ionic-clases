import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CamaraMicroService {

  videoStream?: MediaStream;
  audioStream?: MediaStream;

  mediaRecorder?: MediaRecorder;
  audioChunks: Blob[] = [];

  camaraActiva = false;
  microfonoActivo = false;
  grabandoAudio = false;


  async pedirCamara(): Promise<MediaStream> {
    this.videoStream = await navigator.mediaDevices.getUserMedia({
      video: true,
    });
    this.camaraActiva = true;
    return this.videoStream;
  }

apagarCamara(): void {
  if (this.videoStream) {
    this.videoStream.getTracks().forEach(track => track.stop());
    this.videoStream = undefined;
    this.camaraActiva = false;
  }
}

// Foto

  tomarFoto(video: HTMLVideoElement): Blob | null {
    if (!video.videoWidth || !video.videoHeight) {
      console.warn('Video aún no está listo');
      return null;
    }

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.drawImage(video, 0, 0);

    const dataUrl = canvas.toDataURL('image/png');
    return this.dataURLtoBlob(dataUrl);
  }

  dataURLtoBlob(dataUrl: string): Blob {
    const parts = dataUrl.split(',');
    if (parts.length !== 2) {
      throw new Error('DataURL inválido');
    }

    const match = parts[0].match(/:(.*?);/);
    if (!match) {
      throw new Error('Formato MIME no válido');
    }

    const mime = match[1];
    const bstr = atob(parts[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new Blob([u8arr], { type: mime });
  }

//Microfono

  async pedirMicrofono(): Promise<MediaStream> {
    this.audioStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    this.microfonoActivo = true;
    return this.audioStream;
  }

  apagarMicrofono(): void {
    this.audioStream?.getTracks().forEach((track) => track.stop());
    this.audioStream = undefined;
    this.microfonoActivo = false;
  }

  /* =========================
     🔴 GRABAR AUDIO
     ========================= */

  iniciarGrabacion(): void {
    if (!this.audioStream) {
      throw new Error('El micrófono no está activo');
    }

    this.audioChunks = [];
    this.mediaRecorder = new MediaRecorder(this.audioStream);
    this.grabandoAudio = true;

    this.mediaRecorder.ondataavailable = (event) => {
      this.audioChunks.push(event.data);
    };

    this.mediaRecorder.start();
  }

  detenerGrabacion(): Promise<Blob> {
    return new Promise((resolve) => {
      if (!this.mediaRecorder) return;

      this.mediaRecorder.onstop = () => {
        this.grabandoAudio = false;
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
        resolve(audioBlob);
      };

      this.mediaRecorder.stop();
    });
  }
}
