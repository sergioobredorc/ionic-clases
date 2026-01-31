import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MultimediaService {
    private stream: MediaStream | null = null;
    private recorder: MediaRecorder | null = null;
    private audioChunks: Blob[] = [];

    async requestPermissions(): Promise<{ camera: boolean; mic: boolean }> {
        try {
            this.stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            return { camera: true, mic: true };
        } catch (err) {
            console.error('Error solicitando permisos:', err);
            return { camera: false, mic: false };
        }
    }

    getVideoStream(): MediaStream | null {
        return this.stream;
    }

    capturePhoto(video: HTMLVideoElement): string {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(video, 0, 0);
        return canvas.toDataURL('image/png'); // Devuelve la foto en Base64
    }

    async recordAudio(seconds: number): Promise<Blob> {
        return new Promise((resolve, reject) => {
            if (!this.stream) return reject('No hay permisos de micrófono');
            this.recorder = new MediaRecorder(this.stream);
            this.audioChunks = [];

            this.recorder.ondataavailable = e => this.audioChunks.push(e.data);
            this.recorder.onstop = () => {
                const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
                resolve(audioBlob);
            };

            this.recorder.start();
            setTimeout(() => this.recorder?.stop(), seconds * 1000);
        });
    }
}