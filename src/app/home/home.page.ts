import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, 
  IonButton, IonIcon 
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router'; 
import { addIcons } from 'ionicons';
import { chatbubbles, planet } from 'ionicons/icons'; 

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink,  
    IonHeader, IonToolbar, IonTitle, IonContent, 
    IonButton, IonIcon 
  ],
})
export class HomePage {
  constructor() {
    addIcons({ chatbubbles, planet });
  }
}