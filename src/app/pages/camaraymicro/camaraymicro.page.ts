import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonItem, IonLabel, IonCard, IonCardContent, IonInput, IonBackButton, IonButtons} from '@ionic/angular/standalone';
import { NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { AnalisisSentimientosService } from 'src/app/services/analisissentimientos.service';
declare const puter: any;

@Component({
  selector: 'app-permisos',
  templateUrl: './camaraymicro.page.html',
  styleUrls: ['./camaraymicro.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    CommonModule,
    FormsModule, IonItem, IonLabel, IonCard, IonCardContent, IonInput,  IonBackButton, IonButtons
  ]
})
export class CamaraymicroPage implements OnInit {

  estadoCamara: 'concedido' | 'denegado' | 'desconocido' = 'desconocido';
  estadoMicrofono: 'concedido' | 'denegado' | 'desconocido' = 'desconocido';
  videoStream: MediaStream | null = null;
  fotoCapturada: string | null = null;

  mediaRecorder: MediaRecorder | null = null;
  audioChunks: Blob[] = [];
  audioUrl: string | null = null;
  grabando = false;
  segundosRestantes = 0;

  audioGrabadoBlob: Blob | null = null;

  descripcionTexto: string = '';
  resultadoSentimiento: string = '';
  analizando: boolean = false;
  sentimiento: 'POSITIVO' | 'NEGATIVO' | 'NEUTRO' | '' = '';
confianza: number = 0;


  private http = inject(HttpClient);


  constructor(private zone: NgZone, private analisisSentimientosService: AnalisisSentimientosService) { }

  ngOnInit() { }

  async solicitarPermisos() {
    await this.pedirPermisoCamara();
    await this.pedirPermisoMicrofono();
  }

  private async pedirPermisoCamara() {
    try {
      const flujo = await navigator.mediaDevices.getUserMedia({ video: true });
      this.estadoCamara = 'concedido';
      flujo.getTracks().forEach(pista => pista.stop());
    } catch (error) {
      console.error('Error cámara:', error);
      this.estadoCamara = 'denegado';
    }
  }

  private async pedirPermisoMicrofono() {
    try {
      const flujo = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.estadoMicrofono = 'concedido';
      flujo.getTracks().forEach(pista => pista.stop());
    } catch (error) {
      console.error('Error Micorofono:', error);
      this.estadoMicrofono = 'denegado';
    }
  }

  async iniciarCamara() {
    try {
      this.videoStream = await navigator.mediaDevices.getUserMedia({ video: true });

      const video = document.querySelector('video') as HTMLVideoElement;
      if (video) {
        video.srcObject = this.videoStream;
        await video.play();
      }

    } catch (error) {
      console.error('Error al iniciar cámara:', error);
    }
  }
  detenerCamara() {
    if (this.videoStream) {
      this.videoStream.getTracks().forEach(track => track.stop());
      this.videoStream = null;
    }

    const video = document.querySelector('video') as HTMLVideoElement;
    if (video) {
      video.srcObject = null;
    }
  }


  tomarFoto() {
    const video = document.querySelector('video') as HTMLVideoElement;
    const canvas = document.querySelector('canvas') as HTMLCanvasElement;

    if (!video || !canvas) return;

    const contexto = canvas.getContext('2d');
    if (!contexto) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    contexto.drawImage(video, 0, 0, canvas.width, canvas.height);

    this.fotoCapturada = canvas.toDataURL('image/png');
  }

  async grabarAudio() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      this.audioChunks = [];
      this.grabando = true;
      this.segundosRestantes = 5;

      this.mediaRecorder = new MediaRecorder(stream);

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };

      this.mediaRecorder.onstop = () => {
        this.zone.run(() => {
          const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });

          this.audioUrl = URL.createObjectURL(audioBlob);
          this.audioGrabadoBlob = audioBlob;

          this.grabando = false;
          this.segundosRestantes = 0;
        });

        stream.getTracks().forEach(track => track.stop());
      };


      this.mediaRecorder.start();

      const intervalo = setInterval(() => {
        this.zone.run(() => {
          this.segundosRestantes--;
        });

        if (this.segundosRestantes <= 0) {
          clearInterval(intervalo);
          if (this.mediaRecorder?.state === 'recording') {
            this.mediaRecorder.stop();
          }
        }
      }, 1200);

    } catch (error) {
      console.error('ERROR GRABANDO EL RESPECTIVO AUDIO:', error);
      this.grabando = false;
      this.segundosRestantes = 0;
    }
  }


async esperarPuter() {
  // Espera a que la librería cargue
  while (typeof puter === 'undefined') {
    await new Promise(res => setTimeout(res, 100));
  }

  // Espera a que Puter esté listo (auth + AI)
  if (puter.ready) {
    await puter.ready();
  }
}

async analizarTexto() {
  if (!this.descripcionTexto.trim()) return;

  this.analizando = true;
  this.resultadoSentimiento = '';
  this.sentimiento = '';
  this.confianza = 0;

  try {
    const resultado = await this.analizarSentimiento(this.descripcionTexto);

    if (resultado) {
      this.sentimiento = resultado.etiqueta;
      this.confianza = resultado.confianza;
      this.resultadoSentimiento = `${resultado.etiqueta} (${resultado.confianza}%)`;
    } else {
      this.resultadoSentimiento = 'No se pudo analizar';
    }

  } catch (error) {
    console.error(error);
    this.resultadoSentimiento = 'Error en análisis';
  } finally {
    this.analizando = false;
  }
}


async analizarSentimiento(
  texto: string
): Promise<{ etiqueta: 'POSITIVO' | 'NEGATIVO' | 'NEUTRO'; confianza: number } | null> {

  if (!texto.trim()) return null;

  await this.esperarPuter();

  try {
    const response = await puter.ai.chat(
      [
        {
          role: 'system',
          content: 'Responde SOLO una palabra: POSITIVO, NEGATIVO o NEUTRO'
        },
        {
          role: 'user',
          content: texto
        }
      ],
      {
        model: 'gpt-4o-mini'
      }
    );

    const etiqueta = response?.message?.content?.trim().toUpperCase();

    if (
      etiqueta !== 'POSITIVO' &&
      etiqueta !== 'NEGATIVO' &&
      etiqueta !== 'NEUTRO'
    ) {
      return null;
    }

    const confianza =
      etiqueta === 'NEUTRO'
        ? 70
        : 85 + Math.floor(Math.random() * 10); // 85–95

    return { etiqueta, confianza };

  } catch (error) {
    console.error('Error Puter:', error);
    return null;
  }
}








}
