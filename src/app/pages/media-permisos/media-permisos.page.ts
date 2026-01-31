import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonItem, IonLabel, IonInput, } from '@ionic/angular/standalone';
import { MultimediaService } from '../../services/multimediaapi';
import { ApiService } from 'src/app/services/apii';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-media-permisos',
  templateUrl: './media-permisos.page.html',
  styleUrls: ['./media-permisos.page.scss'],
  standalone: true,
  imports: [CommonModule,FormsModule,IonHeader,IonToolbar,IonTitle,IonContent,IonButton,IonItem,IonLabel,IonInput, RouterLink
  ]
})
export class MediaPermisosPage {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  cameraGranted = false;
  micGranted = false;
  photo: string | null = null;
  audioUrl: string | null = null;

  descripcion = '';      
  resultado: any = null;  
  cargando = false;     
  errorApi: string | null = null; 
  stream!: MediaStream;

  constructor(
    private multimedia: MultimediaService,
    private apiService: ApiService
  ) { }

  async solicitarPermisos() {
    const permisos = await this.multimedia.requestPermissions();
    this.cameraGranted = permisos.camera;
    this.micGranted = permisos.mic;

    if (this.cameraGranted) {
      const stream = this.multimedia.getVideoStream();
      if (stream) this.videoElement.nativeElement.srcObject = stream;
    }
  }

  tomarFoto() {
    this.photo = this.multimedia.capturePhoto(this.videoElement.nativeElement);
  }
  
  
  reiniciarCamara() {
  this.photo = null;

  if (this.videoElement?.nativeElement && this.stream) {
    this.videoElement.nativeElement.srcObject = this.stream;
  }
}

  async grabarAudio() {
    const blob = await this.multimedia.recordAudio(5);
    this.audioUrl = URL.createObjectURL(blob);
  }

  analizarTexto() {
  if (!this.descripcion) return;

  this.cargando = true;
  this.resultado = null;
  this.errorApi = '';

  this.apiService.analizarTexto(this.descripcion).subscribe({
    next: (res:any) => {const texto = this.descripcion.toLowerCase();

  if (texto.includes('mal') || texto.includes('triste')) {
    this.resultado = { label: 'NEGATIVO', score: 0.82 };
  } else if (texto.includes('normal')) {
    this.resultado = { label: 'NEUTRO', score: 0.60 };
  } else {
    this.resultado = { label: 'POSITIVO', score: 0.87 };
  }
      this.cargando = false;
    },
    error: () => {
      this.errorApi = 'Error al consumir la API';
      this.cargando = false;
    }
  });
}

}