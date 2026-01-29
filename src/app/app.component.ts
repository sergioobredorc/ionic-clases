import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { 
  IonApp, IonSplitPane, IonMenu, IonContent, IonList, 
  IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, 
  IonLabel, IonRouterOutlet, IonAvatar 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { home, chatbubbles, planet, videocam, logOut } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink, RouterLinkActive, 
    IonApp, IonSplitPane, IonMenu, IonContent, IonList, 
    IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, 
    IonLabel, IonRouterOutlet, IonAvatar
  ],
})
export class AppComponent {
  
  public appPages = [
    { title: 'Inicio', url: '/home', icon: 'home' },
    { title: 'Chat Inteligente', url: '/chat', icon: 'chatbubbles' },
    { title: 'Explorador API', url: '/rick-morty', icon: 'planet' },
    { title: 'Multimedia & IA', url: '/camara', icon: 'videocam' },
    { title: 'Cerrar Sesión', url: '/login', icon: 'log-out' }
  ];

  constructor() {
    addIcons({ home, chatbubbles, planet, videocam, logOut });
  }
}