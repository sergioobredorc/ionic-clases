import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MediaService } from '../../services/media.service';
import { ApiAnalisisService } from '../../services/api-analisis.service';

@Component({
  selector: 'app-multimedia',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule], 
  templateUrl: './multimedia.page.html',
  styleUrls: ['./multimedia.page.scss'],
})
export class MultimediaPage {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvasElement') canvasElement!: ElementRef<HTMLCanvasElement>;

  camaraOk = false;
  microOk = false;
  grabando = false;
  analizando = false;
  permisosConcedidos = false;
  errorMsg = '';

  stream?: MediaStream;
  fotoCapturada?: string;
  audioUrl?: string;
  textoAnalizar = '';
  resultadoIA: any = null;

  constructor(
    private mediaService: MediaService,
    private apiService: ApiAnalisisService
  ) {}

  async obtenerPermisos() {
    this.errorMsg = '';
    try {
      this.stream = await this.mediaService.getPermissions();
      this.camaraOk = true;
      this.microOk = true;
      this.permisosConcedidos = true;
      
      setTimeout(() => {
        if (this.videoElement && this.stream) {
          this.videoElement.nativeElement.srcObject = this.stream;
          this.videoElement.nativeElement.play();
        }
      }, 300);
    } catch (err) {
      this.errorMsg = 'Error: Acceso denegado a los periféricos.';
      this.permisosConcedidos = false;
    }
  }

  tomarFoto() {
    if (!this.videoElement || !this.canvasElement) return;
    
    const canvas = this.canvasElement.nativeElement;
    const video = this.videoElement.nativeElement;

    if (video.videoWidth > 0) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        this.fotoCapturada = canvas.toDataURL('image/png');
      }
    }
  }

  async grabarAudio() {
    if (!this.stream) return;
    this.grabando = true;
    try {
      const audioBlob = await this.mediaService.recordAudio(this.stream, 5000);
      this.audioUrl = URL.createObjectURL(audioBlob);
    } catch (err) {
      this.errorMsg = 'Error en la grabación.';
    } finally {
      this.grabando = false;
    }
  }

  analizar() {
    if (!this.textoAnalizar) return;
    this.analizando = true;
    this.apiService.analizarSentimiento(this.textoAnalizar).subscribe({
      next: (res) => {
        this.resultadoIA = res;
        this.analizando = false;
      },
      error: () => {
        this.errorMsg = 'Fallo en la conexión con la API.';
        this.analizando = false;
      }
    });
  }
}