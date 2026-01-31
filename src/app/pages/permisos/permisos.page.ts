import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonItem, IonLabel, IonInput } from '@ionic/angular/standalone';
import { MultimediaService } from '../../services/multimedia.service';
import { ApimediaService } from '../../services/apimedia.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.page.html',
  styleUrls: ['./permisos.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonItem,
    IonLabel,
    IonInput,
    RouterLink
  ]
})
export class PermisosPage {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  cameraGranted = false;
  micGranted = false;
  photo: string | null = null;
  audioUrl: string | null = null;

  description = '';       // texto a analizar
  apiResult: any = null;  // resultado de la API
  loadingApi = false;     // estado de carga
  errorMsg: string | null = null; // mensaje de error

  constructor(
    private multimedia: MultimediaService,
    private apimedia: ApimediaService
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

  async grabarAudio() {
    const blob = await this.multimedia.recordAudio(5);
    this.audioUrl = URL.createObjectURL(blob);
  }

  analizar() {
    if (!this.description) return;
    this.loadingApi = true;
    this.apimedia.analizarSentimiento(this.description).subscribe({
      next: (res) => {
        this.apiResult = res;
        this.loadingApi = false;
      },
      error: () => {
        this.errorMsg = 'Fallo en la conexión con la API.';
        this.loadingApi = false;
      }
    });
  }
}
