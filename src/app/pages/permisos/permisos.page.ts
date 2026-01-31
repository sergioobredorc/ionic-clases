import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { CamaraMicroService } from '../../services/camara-micro.service';
import { SentimientoService } from '../../services/sentimiento.service';

@Component({
  selector: 'app-permisos',
  standalone: true,
  templateUrl: './permisos.page.html',
  styleUrls: ['./permisos.page.scss'],
  imports: [CommonModule, IonicModule, FormsModule],
})
export class PermisosPage {
  @ViewChild('video') video!: ElementRef<HTMLVideoElement>;

  permisoCamara = false;
  permisoMicrofono = false;

  contador = 0;
  intervalo?: any;

  fotoBase64: string | null = null;
  audioUrl: string | null = null;

  texto = '';
  resultado: any;
  cargando = false;
  error = '';

  constructor(
    public camara: CamaraMicroService,
    private sentimientoService: SentimientoService,
  ) {}

// Camara

  async encenderCamara() {
    try {
      const stream = await this.camara.pedirCamara();

      setTimeout(async () => {
        if (!this.video?.nativeElement) return;

        this.video.nativeElement.srcObject = stream;
        await this.video.nativeElement.play();

        this.permisoCamara = true;
        this.error = '';
      }, 0);
    } catch {
      this.error = 'No se pudo acceder a la cámara';
      this.permisoCamara = false;
    }
  }

  apagarCamara() {
    this.camara.apagarCamara();

    if (this.video?.nativeElement) {
      this.video.nativeElement.pause();
      this.video.nativeElement.srcObject = null;
    }

    this.permisoCamara = false;
  }

  tomarFoto() {
    const blob = this.camara.tomarFoto(this.video.nativeElement);

    if (!blob) {
      this.error = 'La cámara aún no está lista';
      return;
    }

    this.fotoBase64 = URL.createObjectURL(blob);
    this.apagarCamara();
  }

// Audio 

  async activarMicrofono() {
    try {
      await this.camara.pedirMicrofono();
      this.permisoMicrofono = true;
    } catch {
      this.error = 'Permiso de micrófono denegado';
    }
  }

  apagarMicrofono() {
    if (this.camara.grabandoAudio) {
      this.detenerGrabacion();
    }
    this.camara.apagarMicrofono();
    this.permisoMicrofono = false;
  }

  iniciarGrabacion() {
    this.audioUrl = null;
    this.contador = 5;

    this.camara.iniciarGrabacion();

    this.intervalo = setInterval(() => {
      this.contador--;

      if (this.contador === 0) {
        this.detenerGrabacion();
      }
    }, 1200);
  }

  async detenerGrabacion() {
    clearInterval(this.intervalo);

    const audioBlob = await this.camara.detenerGrabacion();
    this.audioUrl = URL.createObjectURL(audioBlob);
  }

//Sentimiento

  analizarTexto() {
    if (!this.texto.trim()) {
      this.error = 'Ingrese un texto para analizar';
      return;
    }

    this.cargando = true;
    this.error = '';

    this.sentimientoService.analizarTexto(this.texto).subscribe({
      next: (res) => {
        this.resultado = res;
        this.cargando = false;
      },
      error: () => {
        this.error = 'Error al analizar el texto';
        this.cargando = false;
      },
    });
  }
}
