import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-permisos',
  standalone: true,
  templateUrl: './permisos.page.html',
  styleUrls: ['./permisos.page.scss'],
  imports: [IonicModule, CommonModule]
})
export class PermisosPage {

  permisosOk = false;
  stream: MediaStream | null = null;

  async solicitarPermisos() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });

      this.permisosOk = true;
      console.log('Permisos de cámara y micrófono concedidos');
    } catch (error) {
      console.error('Permisos denegados', error);
      alert('No se concedieron los permisos');
    }
  }

  detener() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
      this.permisosOk = false;
    }
  }
}
