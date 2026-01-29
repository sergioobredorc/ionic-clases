import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, 
  IonButtons, IonBackButton, IonButton, IonIcon, 
  IonCard, IonCardContent, IonBadge, IonSpinner, IonProgressBar,
  IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonItem, IonInput, IonLabel, IonList
} from '@ionic/angular/standalone'; 
import { addIcons } from 'ionicons';
import { camera, image, videocam, mic, play, analytics } from 'ionicons/icons';
import { MediaService } from '../../services/media';
import { AiSentimentService } from '../../services/ai-sentiment';

@Component({
  selector: 'app-camara',
  templateUrl: './camara.page.html',
  styleUrls: ['./camara.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonContent, IonHeader, IonTitle, IonToolbar, 
    IonButtons, IonBackButton, IonButton, IonIcon, 
    IonCard, IonCardContent, IonBadge, IonSpinner, IonProgressBar,
    IonCardHeader, IonCardSubtitle, IonCardTitle,
    IonItem, IonInput, IonLabel, IonList
  ]
})
export class CamaraPage implements OnDestroy {

  @ViewChild('videoPlayer') videoElement!: ElementRef;

  photo: string | null = null;
  audioUrl: string | null = null;
  isStreaming = false;
  isRecording = false;
  permissionStatus: 'pending' | 'granted' | 'denied' = 'pending';

  textToAnalyze = '';
  sentimentResult: any = null;
  analyzing = false;

  constructor(
    private mediaService: MediaService,
    private aiService: AiSentimentService
  ) { 
    addIcons({ camera, image, videocam, mic, play, analytics });
  }

  async startCamera() {
    try {
      const stream = await this.mediaService.openCamera();
      this.videoElement.nativeElement.srcObject = stream;
      this.isStreaming = true;
      this.permissionStatus = 'granted';
    } catch (error) {
      this.permissionStatus = 'denied';
    }
  }

  capture() {
    if (this.isStreaming) {
      this.photo = this.mediaService.takePhoto(this.videoElement.nativeElement);
    }
  }

  async recordAudio() {
    this.isRecording = true;
    this.audioUrl = null; 
    await this.mediaService.startRecording();
    setTimeout(async () => {
      const audioBlob = await this.mediaService.stopRecording();
      this.audioUrl = URL.createObjectURL(audioBlob);
      this.isRecording = false;
    }, 5000);
  }


  analyzeText() {
    if (!this.textToAnalyze.trim()) return;

    this.analyzing = true;
    this.sentimentResult = null;

    this.aiService.analyze(this.textToAnalyze).subscribe({
      next: (res: any) => {

        if (res && res[0]) {
          const data = res[0];
          
          this.sentimentResult = {
            label: data.label, 
            score: Math.round(data.score * 100) + '%'
          };
        }
        this.analyzing = false;
      },
      error: (err) => {
        console.error('Error inesperado:', err);
        this.analyzing = false;
      }
    });
  }

  stop() {
    this.mediaService.stopCamera();
    this.isStreaming = false;
  }

  ngOnDestroy() {
    this.stop();
  }
}